using Coupon.Dto;
using Coupon.Forms.Common;
using System.Collections.Generic;

namespace Coupon.FronEnd.ViewModels
{
    public class ProductsListViewModel
    {
        public PagingForm PagingForm { get; set; }

        public IEnumerable<ProductDto> Products { get; set; }
    }
}
