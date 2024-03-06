using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class addforites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "favoritesLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProperty = table.Column<int>(type: "int", nullable: true),
                    LastUpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdatedBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favoritesLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_favoritesLists_properties_IdProperty",
                        column: x => x.IdProperty,
                        principalTable: "properties",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_favoritesLists_IdProperty",
                table: "favoritesLists",
                column: "IdProperty");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "favoritesLists");
        }
    }
}
