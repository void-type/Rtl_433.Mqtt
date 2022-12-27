﻿namespace HomeSensors.Model.Helpers;

public static class DateTimeExtensions
{
    /// <summary>
    /// Interval keys are period starting. Eg: 8:05 to 8:09:59 with 5m intervals will key to 8:05.
    /// </summary>
    /// <param name="time">The time to round</param>
    /// <param name="intervalMinutes">The interval of minutes to round down to</param>
    public static DateTimeOffset RoundDownMinutes(this DateTimeOffset time, int intervalMinutes)
    {
        // Round down to the last minute.
        var lastMinute = time.AddMilliseconds(-time.Millisecond - (1000 * time.Second));

        // Round down to the last interval
        return lastMinute.AddMinutes(-(lastMinute.Minute % intervalMinutes));
    }
}
