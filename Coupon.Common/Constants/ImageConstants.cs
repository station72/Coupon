using System.Collections.Generic;

namespace Coupon.Common.Constants
{
    public class ImageConstants
    {
        public const string RootImageDirectory = "img";
        public const string OriginalDirectory = "original";

        public static string[] Extensions
        {
            get
            {
                return new string[] { ".png", ".jpg", ".jpeg", ".bmp" };
            }
        }

        //public static readonly Dictionary<string, string> ImageSettings = new Dictionary<string, string>
        //{
        //    { Small, Image300X300 },
        //    { Middle, Image600X600 },
        //    { Large, Image900X900 },
        //};

        //public const string Small = "maxwidth=300&maxheight=300";
        //public const string Middle = "maxwidth=600&maxheight=600";
        //public const string Large = "maxwidth=900&maxheight=900";

        //public const string Image300X300 = "300x300";
        //public const string Image600X600 = "600x600";
        //public const string Image900X900 = "900x900";
        //public const string ImageOriginal = "original";
    }
}
