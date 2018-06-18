using AutoMapper;
using Coupon.Common;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Data.Utils;
using Coupon.Dto;
using Coupon.Forms;
using Coupon.Forms.Category;
using Coupon.Forms.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly CouponDbContext _db;
        private readonly IMapper _map;
        private readonly IRawSqlQuery _rawSql;

        public CategoriesService(
            CouponDbContext dbContext,
            IMapper mapper,
            IRawSqlQuery rawSql)
        {
            _db = dbContext;
            _map = mapper;
            _rawSql = rawSql;
        }

        public async Task<CategoryDto> CreateAsync(INormalized<CategoryCreateForm> rawForm)
        {
            var form = rawForm.Normalize();

            var titleIsOccupied = await _db.Categories
                .AnyAsync(u => u.Title == form.Title);

            if (titleIsOccupied)
                throw new CouponException("Категория с таким названием уже есть", nameof(form.Title));

            var urlIsOccupied = await _db.Categories
                .AnyAsync(u => !string.IsNullOrEmpty(u.FriendlyUrl) && u.FriendlyUrl == form.FriendlyUrl);

            if (urlIsOccupied)
                throw new CouponException("Категория с таким Url уже есть", nameof(form.FriendlyUrl));

            if (!form.ParentId.HasValue)
                return await CreateRootCategory(form);

            return await CreateSubcategory(form);
        }

        private async Task<CategoryDto> CreateRootCategory(CategoryCreateForm form)
        {
            var category = await _db.Categories.AddAsync(new Categories
            {
                Title = form.Title,
                IsParent = false
            });

            await _db.SaveChangesAsync();

            return _map.Map<CategoryDto>(category.Entity);
        }

        private async Task<CategoryDto> CreateSubcategory(CategoryCreateForm form)
        {
            var parentCategory = await _db.Categories
                .FirstOrDefaultAsync(u => u.Id == form.ParentId && !u.IsDeleted);

            if (parentCategory == null)
                throw new CouponException("Родительская категория не найдена", nameof(form.ParentId));

            //TODO: check if parent category has products

            var newCategory = _db.Categories.Add(new Categories
            {
                ParentId = parentCategory.Id,
                Title = form.Title,
                IsParent = false
            });

            parentCategory.IsParent = true;
            await _db.SaveChangesAsync();

            return _map.Map<CategoryDto>(newCategory.Entity);
        }

        public async Task<CategoryDto> GetAsync(string id)
        {
            var q = _db.Categories
            .AsNoTracking()
            .AsQueryable();

            Categories category;
            int intId;
            if (int.TryParse(id, out intId))
            {
                category = await q.FirstOrDefaultAsync(u => u.Id == intId);
            }
            else
            {
                category = await q.FirstOrDefaultAsync(u => u.FriendlyUrl == id);
            }

            if (category == null)
                throw new NotFoundException();

            return _map.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> UpdateAsync(int id, CategoryUpdateForm rawForm)
        {
            var category = await GetTrackedCategory(id);
            var form = rawForm.Normalize();

            var titleIsOccupied = await _db.Categories
                .AnyAsync(u => u.Id != id && u.Title == form.Title);

            if (titleIsOccupied)
                throw new CouponException("Категория с таким названием уже есть", nameof(form.Title));

            var urlIsOccupied = await _db.Categories
                .AnyAsync(u => u.Id != id && u.FriendlyUrl == form.FriendlyUrl);

            if (urlIsOccupied)
                throw new CouponException("Категория с таким Url уже есть", nameof(form.FriendlyUrl));

            category.FriendlyUrl = form.FriendlyUrl;
            category.Title = form.Title;

            await _db.SaveChangesAsync();

            return _map.Map<CategoryDto>(category);
        }

        public async Task<IEnumerable<CategoryDto>> ListAsync(int? parentId)
        {
            var list = await _db.Categories
               .AsNoTracking()
               .Where(u => u.ParentId == parentId && !u.IsDeleted)
               .ToArrayAsync();

            return list.Select(_map.Map<CategoryDto>);
        }

        public async Task MoveToAsync(int id, CategoryMoveForm form)
        {
            if (form.ParentId.HasValue && id == form.ParentId.Value)
                throw new CouponException("Нельзя переместить категорию в себя", nameof(form.ParentId));

            var category = await _db.Categories
                .Include(u => u.Parent)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (category == null)
                throw new NotFoundException();

            if (category.ParentId == form.ParentId)
                return;

            if (category.Parent != null)
            {
                var parentHasAnyCategories = await _db.Categories
                    .AnyAsync(u => u.Id != category.Id
                                && u.ParentId == category.ParentId
                                && !u.IsDeleted);

                if (!parentHasAnyCategories)
                    category.Parent.IsParent = false;
            }

            var isNameConflict = await _db.Categories
                .AnyAsync(u => u.ParentId.Equals(form.ParentId) && u.Title == category.Title && !u.IsDeleted);

            if (isNameConflict)
                throw new CouponException("У родителя уже есть вложенная категория с таким именем.");

            if (!form.ParentId.HasValue)
            {
                await MoveCategoryToRoot(category);
                return;
            }

            await MoveCategoryToOtherCategory(category, form);
        }

        private async Task MoveCategoryToRoot(Categories category)
        {
            category.ParentId = null;
            await _db.SaveChangesAsync();

            return;
        }

        private async Task MoveCategoryToOtherCategory(Categories category, CategoryMoveForm form)
        {
            var newParentCategory = await _db.Categories
                .FirstOrDefaultAsync(u => u.Id == form.ParentId && !u.IsDeleted);

            if (newParentCategory == null)
                throw new CouponException("Родительская категория не найдена", nameof(form.ParentId));

            //var parentCategoryHasProducts = await _dc.MgProducts
            //    .MgAnyAsync(u => u.CategoryId == newParentCategory.Id);

            //if (parentCategoryHasProducts)
            //    return new MgResult<JsTreeCategory> { Error = new MgError { Code = ErrorCodes.CategoryAlreadyHasProducts, Message = "Категория, в которую вы хотите переместить, уже имеет продукты" } };

            var sql = string.Format(@"WITH tree (Id)
                                        AS (SELECT [Id]
	                                        FROM [dbo].[Categories]
	                                        WHERE [ParentId] = {0}
                                        UNION ALL
                                            SELECT [dbo].[Categories].[Id]
	                                        FROM [dbo].[Categories]
	                                        INNER JOIN tree on tree.Id = [dbo].[Categories].[ParentId])
                                        SELECT Id
                                        FROM tree",
                                        category.Id);

            var allNestedCategories = await _rawSql.GetResults(sql, u => u.GetInt32(0));

            if (allNestedCategories.Contains(newParentCategory.Id))
                throw new CouponException("Нельзя переместить в дочернюю категорию", nameof(form.ParentId));

            newParentCategory.IsParent = true;
            category.ParentId = newParentCategory.Id;

            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _db.Categories
                .Include(u => u.Parent)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (category == null)
                throw new NotFoundException();

            if (category.IsParent)
                throw new CouponException("Нельзя удалить родительскую категорию");

            category.IsDeleted = true;

            if (category.ParentId.HasValue)
            {
                var parentHasAnyChilds = await _db.Categories
                    .AnyAsync(u => u.Id != category.Id && u.ParentId == category.ParentId && !u.IsDeleted);

                if (!parentHasAnyChilds)
                    category.Parent.IsParent = false;
            }

            await _db.SaveChangesAsync();
        }

        private async Task<Categories> GetTrackedCategory(int id)
        {
            var category = await _db.Categories
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (category == null)
                throw new NotFoundException();

            return category;
        }
    }
}
