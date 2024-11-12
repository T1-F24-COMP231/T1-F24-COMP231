namespace WebBuilderAPI.Data
{
    public class Layout
    {
        public int Id { get; set; }
        public int UserId { get; set; }        // Foreign key to the user
        public string Title { get; set; }      // Title of the layout
        public string HtmlContent { get; set; }  // HTML content of the layout
        public string CssContent { get; set; }   // CSS content of the layout
        public string JavaScriptContent { get; set; }  // JavaScript content (if any)
        public DateTime CreatedAt { get; set; }  // Timestamp for when the layout was created
        public DateTime UpdatedAt { get; set; }  // Timestamp for the last update
        public bool IsPublished { get; set; }   // Indicates if the layout is published
        public DateTime? PublishedAt { get; set; } // Timestamp for when the layout was published
        public string? DeploymentUrl { get; set; }
    }
}

