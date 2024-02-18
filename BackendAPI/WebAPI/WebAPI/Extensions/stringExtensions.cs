namespace WebAPI.Extensions
{
    public static class stringExtensions
    {
        public static bool IsEmpty(this string value) { 
         return string.IsNullOrEmpty(value.Trim());
        }
    }
}
