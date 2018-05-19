using Coupon.Common;
using Coupon.Data;
using Coupon.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Coupon.Forms;
using AutoMapper;
using Coupon.Data.Model;

namespace Coupon.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly CouponDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoriesService(CouponDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<CategoryDto> CreateAsync(ServiceCreateForm form)
        {
            var categoryToCreation = new Categories()
            {
                Title = form.Title,
                FriendlyUrl = form.FriendlyUrl
            };

            var dbEntity = _dbContext.Categories.Add(categoryToCreation);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<CategoryDto>(dbEntity.Entity);
        }

        public async Task<CategoryDto> GetAsync(string id)
        {
            var service = await _dbContext.Categories
                .FirstOrDefaultAsync(u => u.FriendlyUrl == id);

            if (service == null)
                throw new CouponException("");

            return _mapper.Map<CategoryDto>(service);
        }

        public Task<IEnumerable<CategoryDto>> ListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
