using Coupon.Data.Model;
using System.Threading.Tasks;

namespace Coupon.DAL
{
    public interface IProductsRepository
    {
        Products Add(Products product);

        void Delete(Products product);

        Task<Products> Get(int id);

        Task<int> Save();
    }
}
