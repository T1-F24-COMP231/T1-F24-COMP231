using System.ComponentModel.DataAnnotations;

namespace WebBuilderAPI.RequestModels
{
    public class LayoutRequestModel
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string HtmlContent { get; set; }

        public string CssContent { get; set; }

        public string JavaScriptContent { get; set; }
    }
    public class PublishRequestModel
    {
        public string DeploymentUrl { get; set; } // URL to be used when publishing
    }
}
