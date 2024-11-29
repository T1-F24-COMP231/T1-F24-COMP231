using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using System.Management;

namespace WebBuilderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerHealthController : ControllerBase
    {
        [HttpGet("stats")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult GetServerHealth()
        {
            var healthStats = new
            {
                HardwareInfo = new
                {
                    Manufacturer = "AMD",
                    Model = "EPYC 7413 24-Core Processor"
                },
                CPUInfo = new
                {
                    Manufacturer = "AMD",
                    Brand = "EPYC 7413",
                    Speed = "2.65 GHz",
                    Cores = GetCoresOrDefault(),
                    PhysicalCores = GetPhysicalCoreCountOrDefault(),
                    Usage = GetCpuUsageOrDefault()
                },
                MemoryUsage = GetMemoryUsageOrDefault(),
                DiskUsage = new
                {
                    DriveC = GetDriveStatsOrDefault("C"),
                    DriveD = GetDriveStatsOrDefault("D")
                }
            };

            return Ok(healthStats);
        }

        private int GetCoresOrDefault()
        {
            try
            {
                return Environment.ProcessorCount;
            }
            catch
            {
                return -1; // Default value if retrieval fails
            }
        }

        private int GetPhysicalCoreCountOrDefault()
        {
            try
            {
                int physicalCoreCount = 0;
                using (var searcher = new ManagementObjectSearcher("Select NumberOfCores from Win32_Processor"))
                {
                    foreach (var item in searcher.Get())
                    {
                        physicalCoreCount += int.Parse(item["NumberOfCores"].ToString());
                    }
                }
                return physicalCoreCount;
            }
            catch
            {
                return -1; // Default value if retrieval fails
            }
        }

        private double GetCpuUsageOrDefault()
        {
            try
            {
                var process = Process.GetCurrentProcess();
                TimeSpan startCpuTime = process.TotalProcessorTime;
                DateTime startTime = DateTime.UtcNow;

                // Wait for a small period to calculate the CPU usage
                Thread.Sleep(500);

                TimeSpan endCpuTime = process.TotalProcessorTime;
                DateTime endTime = DateTime.UtcNow;

                double cpuUsedMs = (endCpuTime - startCpuTime).TotalMilliseconds;
                double totalTimeMs = (endTime - startTime).TotalMilliseconds;
                double cpuUsageTotal = (cpuUsedMs / (Environment.ProcessorCount * totalTimeMs)) * 100;

                return cpuUsageTotal;
            }
            catch
            {
                return -1.0; // Default value if retrieval fails
            }
        }


        private long GetMemoryUsageOrDefault()
        {
            try
            {
                using (var searcher = new ManagementObjectSearcher("SELECT TotalVisibleMemorySize, FreePhysicalMemory FROM Win32_OperatingSystem"))
                {
                    foreach (var obj in searcher.Get())
                    {
                        long totalMemory = long.Parse(obj["TotalVisibleMemorySize"].ToString());
                        long freeMemory = long.Parse(obj["FreePhysicalMemory"].ToString());
                        return (totalMemory - freeMemory) / 1024; // Memory in MB
                    }
                }
                return -1;
            }
            catch
            {
                return -1; // Default value if retrieval fails
            }
        }
        private object GetDriveStatsOrDefault(string driveLetter)
        {
            try
            {
                DriveInfo drive = new DriveInfo(driveLetter);
                if (drive.IsReady)
                {
                    double usedSpace = ((drive.TotalSize - drive.AvailableFreeSpace) / (double)drive.TotalSize) * 100;
                    return new
                    {
                        Used = usedSpace.ToString("F2") + "%",
                        Total = (drive.TotalSize / (1024 * 1024 * 1024)).ToString("F2") + " TB"
                    };
                }
                return new { Used = "N/A", Total = "N/A" };
            }
            catch
            {
                return new { Used = "N/A", Total = "N/A" }; // Default values if retrieval fails
            }
        }
    }
}
