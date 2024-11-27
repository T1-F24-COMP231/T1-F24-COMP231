using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBuilderAPI.Migrations
{
    /// <inheritdoc />
    public partial class Customer_Backup_V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerBackup_Accounts_CustomerId",
                table: "CustomerBackup");

            migrationBuilder.DropIndex(
                name: "IX_CustomerBackup_CustomerId",
                table: "CustomerBackup");

            migrationBuilder.AddColumn<int>(
                name: "BackupId",
                table: "LayoutBackup",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CustomerBackupId",
                table: "CustomerBackup",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBackup_CustomerBackupId",
                table: "CustomerBackup",
                column: "CustomerBackupId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerBackup_CustomerBackup_CustomerBackupId",
                table: "CustomerBackup",
                column: "CustomerBackupId",
                principalTable: "CustomerBackup",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerBackup_CustomerBackup_CustomerBackupId",
                table: "CustomerBackup");

            migrationBuilder.DropIndex(
                name: "IX_CustomerBackup_CustomerBackupId",
                table: "CustomerBackup");

            migrationBuilder.DropColumn(
                name: "BackupId",
                table: "LayoutBackup");

            migrationBuilder.DropColumn(
                name: "CustomerBackupId",
                table: "CustomerBackup");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBackup_CustomerId",
                table: "CustomerBackup",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerBackup_Accounts_CustomerId",
                table: "CustomerBackup",
                column: "CustomerId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
