using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Coupon.Common;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Coupon.Forms.Common;
using Coupon.Forms.Common.Interfaces;
using Coupon.Forms.Provider;
using Microsoft.EntityFrameworkCore;

namespace Coupon.Services
{
    public class ProvidersService : IProvidersService
    {
        private readonly CouponDbContext _db;
        private readonly IMapper _mapper;

        public ProvidersService(
            CouponDbContext db,
            IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProviderDto> CreateAsync(INormalized<ProviderCreateForm> rawForm)
        {
            var form = rawForm.Normalize();

            var emailExists = await _db.Providers
                .AnyAsync(u => u.Email == form.Email);

            if (emailExists)
                throw new CouponException("Поставщик с таким email уже есть!!!", nameof(form.Email));

            var titleExists = await _db.Providers
                .AnyAsync(u => u.Title == form.Title);

            if (titleExists)
                throw new CouponException("Поставщик с таким именем уже есть!!!", nameof(form.Title));

            var created = _db.Providers.Add(new Providers
            {
                Title = form.Title,
                Email = form.Email
            });

            await _db.SaveChangesAsync();

            return _mapper.Map<ProviderDto>(created.Entity);
        }

        public async Task<ProviderDto> GetAsync(Guid id)
        {
            var provider = await _db.Providers
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (provider == null)
                throw new NotFoundException();

            return _mapper.Map<ProviderDto>(provider);
        }

        public async Task<IEnumerable<ProviderDto>> ListAsync(PagingForm form)
        {
            var list = await _db.Providers
                .AsNoTracking()
                .Where(u => !u.IsDeleted)
                .Skip(form.Offset)
                .Take(form.Limit)
                .ToArrayAsync();

            return list.Select(_mapper.Map<ProviderDto>);
        }

        public async Task<int> TotalAsync(PagingForm form)
        {
            var count = await _db.Providers
                .Where(u => !u.IsDeleted)
                .CountAsync();

            return count;
        }

        public async Task<ProviderDto> UpdateAsync(Guid id, INormalized<ProviderUpdateForm> rawForm)
        {
            var form = rawForm.Normalize();

            var provider = await _db.Providers
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (provider == null)
                throw new NotFoundException();

            var isEmailOccupied = await _db.Providers
                .AnyAsync(u => u.Email.Equals(form.Email, StringComparison.InvariantCultureIgnoreCase)
                && u.Id != id && !u.IsDeleted);

            if (isEmailOccupied)
                throw new CouponException("Поставщик с таким email уже есть!!!", nameof(form.Email));

            var isTitleOccupied = await _db.Providers
                .AnyAsync(u => u.Title == form.Title && u.Id != id && !u.IsDeleted);

            if (isTitleOccupied)
                throw new CouponException("Поставщик с таким именем уже есть!!!", nameof(form.Title));

            provider.Email = form.Email;
            provider.Title = form.Title;

            await _db.SaveChangesAsync();

            return _mapper.Map<ProviderDto>(provider);
        }
    }
}
