import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dates, setDates] = useState([]);
  const [d, setD] = useState(new Date());
  const [todayDate, setToDayDate] = useState(d.getDate());
  const [todayMonth, setTodayMonth] = useState(d.getMonth());
  const [todayYear, setTodayYear] = useState(d.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthName = new Date(todayYear, todayMonth).toLocaleString("en-US", {
    month: "short",
  });

  useEffect(() => {
    const generateCalendarDates = (year, month) => {
      const dates = [];

      const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
      };

      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;

      const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
      const daysInCurrentMonth = getDaysInMonth(year, month);
      console.log(daysInCurrentMonth);

      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const totalCells = 42;

      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        dates.push({
          date: daysInPrevMonth - i,
          currentMonth: false,
        });
      }

      for (let i = 1; i <= daysInCurrentMonth; i++) {
        dates.push({
          date: i,
          currentMonth: true,
        });
      }

      const remainingCells = totalCells - dates.length;
      for (let i = 1; i <= remainingCells; i++) {
        dates.push({
          date: i,
          currentMonth: false,
        });
      }

      return dates;
    };

    setDates(generateCalendarDates(todayYear, todayMonth));
  }, [todayMonth, todayYear]);

  useEffect(() => {
    setSelectedDate(todayDate);
  }, [setSelectedDate]);

  const handleLeftClick = () => {
    if (todayMonth === 0) {
      setTodayMonth(11);
      setTodayYear(todayYear - 1);
    } else {
      setTodayMonth(todayMonth - 1);
    }
  };

  const handleRightClick = () => {
    if (todayMonth === 11) {
      setTodayMonth(0);
      setTodayYear(todayYear + 1);
    } else {
      setTodayMonth(todayMonth + 1);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const calenderIconClick = () => {
    alert(
      `Selected Date Is ${selectedDate} / ${todayMonth + 1} / ${todayYear}`
    );
  };

  return (
    <div className="flex items-center gap-[3rem]">
      <div className="bg-[#FFFFFF] w-[20rem] h-[20rem] mt-[6rem] rounded-[1rem] p-[1rem]">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[1.2rem]">
            {monthName} {todayYear}
          </span>
          <div className="flex gap-[1rem]">
            <IoIosArrowBack
              onClick={handleLeftClick}
              className={`hover:cursor-pointer text-[1.2rem] ${
                todayMonth >= d.getMonth() ? "text-gray-950" : "text-gray-400"
              }`}
            />
            <IoIosArrowForward
              onClick={handleRightClick}
              className={`hover:cursor-pointer text-[1.2rem] ${
                todayMonth <= d.getMonth() ? "text-gray-950" : "text-gray-400"
              }`}
            />
          </div>
        </div>
        <div className="flex justify-around mt-[1rem] font-semibold">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-rows-6 grid-cols-7 w-[18rem] h-[75%] m-[0.2rem] border-solid border-[1px] border-[#D5D4DF]">
          {dates?.map((item, index) => (
            <p
              key={index}
              className={`flex justify-center items-center border-solid border-[1px] border-[#D5D4DF] hover:cursor-pointer ${
                item.date === selectedDate && item.currentMonth
                  ? "bg-[#45539D] text-white"
                  : "hover:bg-[#E9F0F5]"
              } ${item.currentMonth ? "" : "text-gray-400"}`}
              onClick={() => handleDateClick(item.date)}
            >
              {item.date}
            </p>
          ))}
        </div>
      </div>
      <div className="relative">
        <span className="flex items-center justify-between w-[12rem] h-[3rem] bg-[#414E55] text-[#cbcbcb] mt-[3rem] p-[0.8rem] border-[1px] border-black rounded-[0.3rem]">
          <p>{`${selectedDate} / ${todayMonth + 1} / ${todayYear}`}</p>

          <CiCalendar
            className="text-[1.3rem] hover:cursor-pointer"
            onClick={calenderIconClick}
          />
        </span>
        <p className="absolute top-[35%] left-[5%] bg-[#414E55] text-[#cbcbcb] ">
          Date Picker
        </p>
      </div>
    </div>
  );
}

export default App;
