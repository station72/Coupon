using Coupon.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Coupon.Data.Model
{
    public class Products
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string FullTitle { get; set; }

        public bool IsDeleted { get; set; }

        public DateTimeOffset ValidFrom { get; set; }

        public DateTimeOffset ValidUntil { get; set; }

        public IList<Comments> Comments { get; set; }

        //TODO: possible move to separate table to decrease amount of data on list fetching
        public string Description { get; set; }

        public string Conditions { get; set; }

        public Guid MainImageId { get; set; }

        public Images MainImage { get; set; }

        public IList<Images> Images { get; set; }

        public int ProviderId { get; set; }

        [ForeignKey(nameof(ProviderId))]
        public Providers Provider { get; set; }

        public decimal OldPrice { get; set; }

        public decimal NewPrice { get; set; }

        public int StartAvailableCount { get; set; }

        public int AvailableCount { get; set; }

        public bool OnSale { get; set; }

        public ProductState State { get; set; }
    }
}
