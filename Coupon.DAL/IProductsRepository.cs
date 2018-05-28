using Coupon.Data.Model;
using Coupon.Forms.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.DAL
{
    public interface IProductsRepository
    {
        Task<Products> Add(Products product);

        void Delete(Products product);

        Task<Products> Get(int id);

        Task<int> Save();

        Task<IEnumerable<Products>> GetListAsync(PagingForm pagingForm);
    }
}
