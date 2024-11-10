﻿using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;

namespace WebBuilderAPI.Repositories
{
    public class LayoutRepository
    {
        private readonly DbContextApp _dbContext;

        public LayoutRepository(DbContextApp dbContext)
        {
            _dbContext = dbContext;
        }

        // Create a new layout
        public async Task NewLayout(Layout layout)
        {
            layout.CreatedAt = DateTime.UtcNow;
            layout.UpdatedAt = DateTime.UtcNow;

            await _dbContext.Layouts.AddAsync(layout);
            await _dbContext.SaveChangesAsync();
        }

        // Update an existing layout
        public async Task UpdateLayout(int id, Layout layout)
        {
            var existingLayout = await _dbContext.Layouts.FindAsync(id);
            if (existingLayout == null) throw new Exception("Layout not found");

            existingLayout.Title = layout.Title;
            existingLayout.HtmlContent = layout.HtmlContent;
            existingLayout.CssContent = layout.CssContent;
            existingLayout.JavaScriptContent = layout.JavaScriptContent;
            existingLayout.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
        }

        // Delete a layout
        public async Task DeleteLayout(int id)
        {
            var layout = await _dbContext.Layouts.FindAsync(id);
            if (layout == null) throw new Exception("Layout not found");

            _dbContext.Layouts.Remove(layout);
            await _dbContext.SaveChangesAsync();
        }

        // Get a specific layout
        public async Task<Layout> GetLayout(int id)
        {
            return await _dbContext.Layouts.FindAsync(id);
        }

        // Get layouts for a specific user
        public async Task<List<Layout>> GetLayoutsByUserId(int userId)
        {
            return await _dbContext.Layouts.Where(l => l.UserId == userId).ToListAsync();
        }
    }
}