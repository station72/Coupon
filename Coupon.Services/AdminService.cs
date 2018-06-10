using AutoMapper;
using Coupon.Common;
using Coupon.Common.Enums;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Coupon.Forms.Admin;
using Coupon.Forms.Auth;
using Coupon.Forms.Common;
using Coupon.Forms.Common.Interfaces;
using Coupon.Utils.Security;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public class AdminService : IAdminService
    {
        private readonly CouponDbContext _db;
        private readonly IMapper _map;

        public AdminService(
            CouponDbContext db,
            IMapper map
            )
        {
            _db = db;
            _map = map;
        }

        public async Task<AdminDto> GetForLoginAsync(INormalized<LoginForm> rawForm)
        {
            var form = rawForm.Normalize();

            var user = await _db.AdminUsers
                .FirstOrDefaultAsync(u => u.Login == form.UserName);

            if (user == null)
                throw new CouponException("Такого пользователя нет, либо пароль неверен.", "");

            if (user.PasswordHash != Hash.Create(form.Password, user.PasswordSalt))
                throw new CouponException("Такого пользователя нет, либо пароль неверен.", "");

            return _map.Map<AdminDto>(user);
        }

        public async Task<AdminDto> GetAsync(int id)
        {
            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (admin == null)
                throw new NotFoundException();

            return _map.Map<AdminDto>(admin);
        }

        public async Task<AdminDto> CreateAsync(INormalized<CreateAdminForm> rawForm)
        {
            var form = rawForm.Normalize();

            var emailOccupied = await _db.AdminUsers
                .AnyAsync(u => !u.IsDeleted && u.Email == form.Email);

            if (emailOccupied)
                throw new CouponException("Администратор с этим email уже есть", nameof(form.Email));

            var loginOccupied = await _db.AdminUsers
                .AnyAsync(u => !u.IsDeleted && u.Login == form.Login);

            if (loginOccupied)
                throw new CouponException("Администратор с этим логином уже есть", nameof(form.Login));

            var salt = Salt.Create();
            var adminToAdd = new AdminUsers
            {
                Email = form.Email,
                Login = form.Login,
                Name = form.Name,
                Role = AdminRole.Admin,
                PasswordSalt = salt,
                PasswordHash = Hash.Create(form.Password, salt),
                Token = Guid.NewGuid()
            };
            var admin = _db.AdminUsers.Add(adminToAdd);
            await _db.SaveChangesAsync();

            return _map.Map<AdminDto>(admin.Entity);
        }

        public async Task<IEnumerable<AdminDto>> GetListAsync(PagingForm form)
        {
            var list = await _db.AdminUsers
                .Where(u => !u.IsDeleted)
                .Skip(form.Offset)
                .Take(form.Limit)
                .ToArrayAsync();

            return list.Select(_map.Map<AdminDto>);
        }

        public Task<int> GetTotalCount()
        {
            return _db.AdminUsers
                .Where(u => !u.IsDeleted)
                .CountAsync();
        }

        public async Task<AdminDto> UpdateAsync(int id, UpdateAdminForm rawForm)
        {
            var form = rawForm.Normalize();

            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (admin == null)
                throw new NotFoundException();

            var emailOccupied = await _db.AdminUsers
                .AnyAsync(u => u.Email == form.Email && u.Id != id && !u.IsDeleted);

            if (emailOccupied)
                throw new CouponException("Администратор с этим email уже есть", nameof(form.Email));

            var loginOccupied = await _db.AdminUsers
                .AnyAsync(u => u.Login == form.Login && u.Id != id && !u.IsDeleted);

            if (loginOccupied)
                throw new CouponException("Администратор с этим логином уже есть", nameof(form.Login));

            admin.Email = form.Email;
            admin.Name = form.Name;
            admin.Login = form.Login;
            admin.Role = form.Role;

            await _db.SaveChangesAsync();

            return _map.Map<AdminDto>(admin);
        }

        public async Task DeleteAsync(int id)
        {
            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (admin == null)
                return;

            admin.IsDeleted = true;

            await _db.SaveChangesAsync();
        }

        public async Task UpdatePasswordAsync(int id, UpdatePasswordForm form)
        {
            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            if (admin == null)
                throw new NotImplementedException();

            var salt = Salt.Create();

            admin.PasswordSalt = salt;
            admin.PasswordHash = Hash.Create(form.Password, salt);

            await _db.SaveChangesAsync();
        }
    }
}
