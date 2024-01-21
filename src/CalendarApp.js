import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './CalendarApp.css';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});
  const [showMemoModal, setShowMemoModal] = useState(false);

  const handleDateClick = (newDate) => {
    setSelectedDate(newDate);

    // 클릭한 날짜에 해당하는 메모를 보여주기
    setShowMemoModal(true);

    // 메모가 있으면 보이게 하고, 없으면 공백의 메모창 보이도록
    if (memos[newDate.toDateString()]) {
      setMemo(memos[newDate.toDateString()]);
    } else {
      setMemo('');
    }
  };

  const handleMemoModalClose = () => {
    setShowMemoModal(false);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const saveMemo = () => {
    setMemos({ ...memos, [selectedDate.toDateString()]: memo });
    setShowMemoModal(false);
  };

  return (
    <div className="calendar-app">
      <div className="modal-container" style={{ display: showMemoModal ? 'flex' : 'none' }}>
        <div className="memo-container">
          <h2>{selectedDate.toDateString()}</h2>
          <div className="memo-editor">
            <DatePicker selected={selectedDate} onChange={() => {}} />
            <textarea
              placeholder="메모를 입력하세요"
              value={memo}
              onChange={handleMemoChange}
            />
            <button onClick={saveMemo}>메모 저장</button>
          </div>
          <div className="memo-display">
            <h3>{selectedDate.toDateString()} 메모</h3>
            <p>{memos[selectedDate?.toDateString()]}</p>
          </div>
          <button onClick={handleMemoModalClose}>닫기</button>
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const memoForDay = memos[date.toDateString()];
              return memoForDay && <p style={{ margin: 0 }}>{memoForDay}</p>;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
