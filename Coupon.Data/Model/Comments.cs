using System;

namespace Coupon.Data.Model
{
    public class Comments
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public string Text { get; set; }

        public int CountOfUseful { get; set; }

        public int CountOfUseles { get; set; }

        public int ProductId { get; set; }

        public Products Product { get; set; }
    }
}
