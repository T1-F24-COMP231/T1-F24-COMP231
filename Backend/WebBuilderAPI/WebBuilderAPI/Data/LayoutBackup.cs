using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebBuilderAPI.Data
{
    public class LayoutBackup
    {
        public int Id { get; set; }

        [ForeignKey(nameof(CustomerBackup))]
        public int BackupId { get; set; }

        [JsonIgnore]
        public CustomerBackup CustomerBackup { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string HtmlContent { get; set; }
        public string CssContent { get; set; }
        public string JavaScriptContent { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; } 
        public bool IsPublished { get; set; } 
        public DateTime? PublishedAt { get; set; } 
        public string? DeploymentUrl { get; set; }

    }
}
