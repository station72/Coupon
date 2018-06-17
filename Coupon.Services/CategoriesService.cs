using AutoMapper;
using Coupon.Common;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Coupon.Forms;
using Coupon.Forms.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly CouponDbContext _db;
        private readonly IMapper _map;

        public CategoriesService(
            CouponDbContext dbContext,
            IMapper mapper)
        {
            _db = dbContext;
            _map = mapper;
        }

        public async Task<CategoryDto> CreateAsync(INormalized<CategoryCreateForm> rawForm)
        {
            var form = rawForm.Normalize();

            var categoryToCreation = new Categories()
            {
                Title = form.Title,
                FriendlyUrl = form.FriendlyUrl
            };

            var dbEntity = _db.Categories.Add(categoryToCreation);
            await _db.SaveChangesAsync();

            return _map.Map<CategoryDto>(dbEntity.Entity);
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

        public async Task<IEnumerable<CategoryDto>> ListAsync(int? parentId)
        {
            var list = await _db.Categories
               .AsNoTracking()
               //.Where(u => u.ParentId == parentId && !u.IsDeleted)
               .ToArrayAsync();

            return list.Select(_map.Map<CategoryDto>);
        }
    }
}
