using System;

namespace WebBuilderAPI.Data
{
    public class BackupEntry
    {
        public int Id { get; set; }
        public string FilePath { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
