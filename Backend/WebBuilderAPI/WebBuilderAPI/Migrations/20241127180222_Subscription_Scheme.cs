using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebBuilderAPI.Migrations
{
    /// <inheritdoc />
    public partial class Subscription_Scheme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerBackup_CustomerBackup_CustomerBackupId",
                table: "CustomerBackup");

            migrationBuilder.DropIndex(
                name: "IX_CustomerBackup_CustomerBackupId",
                table: "CustomerBackup");

            migrationBuilder.DropColumn(
                name: "CustomerBackupId",
                table: "CustomerBackup");

            migrationBuilder.CreateTable(
                name: "BillingInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false),
                    CardNumber = table.Column<string>(type: "longtext", nullable: false),
                    NameOnCard = table.Column<string>(type: "longtext", nullable: false),
                    PostalCode = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingInfo", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "subscription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    BillingId = table.Column<int>(type: "int", nullable: true),
                    ChargeDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subscription", x => x.Id);
                    table.ForeignKey(
                        name: "FK_subscription_Accounts_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_subscription_BillingInfo_BillingId",
                        column: x => x.BillingId,
                        principalTable: "BillingInfo",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutBackup_BackupId",
                table: "LayoutBackup",
                column: "BackupId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBackup_CustomerId",
                table: "CustomerBackup",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_subscription_BillingId",
                table: "subscription",
                column: "BillingId");

            migrationBuilder.CreateIndex(
                name: "IX_subscription_CustomerId",
                table: "subscription",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerBackup_Accounts_CustomerId",
                table: "CustomerBackup",
                column: "CustomerId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LayoutBackup_CustomerBackup_BackupId",
                table: "LayoutBackup",
                column: "BackupId",
                principalTable: "CustomerBackup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerBackup_Accounts_CustomerId",
                table: "CustomerBackup");

            migrationBuilder.DropForeignKey(
                name: "FK_LayoutBackup_CustomerBackup_BackupId",
                table: "LayoutBackup");

            migrationBuilder.DropTable(
                name: "subscription");

            migrationBuilder.DropTable(
                name: "BillingInfo");

            migrationBuilder.DropIndex(
                name: "IX_LayoutBackup_BackupId",
                table: "LayoutBackup");

            migrationBuilder.DropIndex(
                name: "IX_CustomerBackup_CustomerId",
                table: "CustomerBackup");

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
    }
}
