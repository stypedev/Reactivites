namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string messagge, string details = null)
        {
            StatusCode = statusCode;
            Messagge = messagge;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Messagge { get; set; }
        public string Details { get; set; }
    }
}