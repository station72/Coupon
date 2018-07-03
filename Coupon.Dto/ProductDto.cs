using Coupon.Common.Enums;
using Coupon.Data.Model;
using System;
using System.Collections.Generic;

namespace Coupon.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string FullTitle { get; set; }

        public DateTimeOffset ValidFrom { get; set; }

        public DateTimeOffset ValidUntil { get; set; }

        public string Description { get; set; }

        public string Conditions { get; set; }

        public Guid MainImageId { get; set; }

        public Images MainImage { get; set; }

        public IEnumerable<Images> Images { get; set; }

        public Guid ProviderId { get; set; }

        public Providers Provider { get; set; }

        public decimal OldPrice { get; set; }

        public decimal NewPrice { get; set; }

        public int StartAvailableCount { get; set; }

        public int AvailableCount { get; set; }

        public bool OnSale { get; set; }

        public ProductState State { get; set; }
    }
}
