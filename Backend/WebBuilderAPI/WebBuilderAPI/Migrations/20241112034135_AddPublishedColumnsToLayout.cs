using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBuilderAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPublishedColumnsToLayout : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeploymentUrl",
                table: "Layouts",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublished",
                table: "Layouts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedAt",
                table: "Layouts",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeploymentUrl",
                table: "Layouts");

            migrationBuilder.DropColumn(
                name: "IsPublished",
                table: "Layouts");

            migrationBuilder.DropColumn(
                name: "PublishedAt",
                table: "Layouts");
        }
    }
}
