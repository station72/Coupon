using AutoMapper;
using Coupon.Common;
using Coupon.DAL;
using Coupon.Data.Model;
using Coupon.Dto;
using Coupon.Forms;
using Coupon.Forms.Common;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public class ProductsService : IProductsService
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IMapper _mapper;

        public ProductsService(
            IProductsRepository productsRepository,
            IMapper mapper)
        {
            _productsRepository = productsRepository;
            _mapper = mapper;
        }

        public async Task<ProductDto> CreateAsync(ProductCreateForm form)
        {
            var productForCreation = new Products
            {
                Title = form.Title
            };

            var result = await _productsRepository.Add(productForCreation);
            //await _productsRepository.Save();

            var mapperdProduct = _mapper.Map<ProductDto>(result);
            return mapperdProduct;
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _productsRepository.Get(id);
            if (product == null)
                throw new NotFoundException();

            _productsRepository.Delete(product);
            await _productsRepository.Save();
        }

        public async Task<ProductDto> GetAsync(int id)
        {
            var product = await _productsRepository.Get(id);

            if (product == null)
                throw new NotFoundException();

            return _mapper.Map<ProductDto>(product);
        }

        public async Task<IEnumerable<ProductDto>> GetListAsync(PagingForm pagingForm)
        {
            var products = await _productsRepository.GetListAsync(pagingForm);
            return products.Select(_mapper.Map<ProductDto>);
        }

        public async Task<ProductDto> UpdateAsync(int id, ProductUpdateForm form)
        {
            var product = await _productsRepository.Get(id);

            if (product == null)
                throw new NotFoundException();

            product.Title = form.Title;
            await _productsRepository.Save();

            return _mapper.Map<ProductDto>(product);
        }
    }
}