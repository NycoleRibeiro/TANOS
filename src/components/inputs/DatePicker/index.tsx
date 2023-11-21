import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import ptBR from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'
import './style.sass'

import CalendarIcon from '../../../assets/icons/calendar.svg'
import ClearIcon from '../../../assets/icons/cancel.svg'

interface DatePickerProps {
  label?: string
  onChange: (date: Date | null) => void
}

export const DateSelect: React.FC<DatePickerProps> = ({
  label = 'Data',
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [focus, setFocus] = useState(false) // Estado para controlar o foco do input, utilizado para questões de estilo
  const [isOpen, setIsOpen] = useState(false)
  const datePickerRef = useRef<DatePicker | null>(null)

  return (
    <div className="custom-datepicker">
      <label htmlFor="DatePicker" className="text">
        {label}
      </label>
      <div className={`input ${focus || selectedDate ? 'active' : ''}`}>
        <DatePicker
          ref={datePickerRef}
          showYearDropdown
          showMonthDropdown
          locale={ptBR}
          dateFormatCalendar="LLLL yyyy"
          dateFormat="dd/MM/yyyy"
          selected={selectedDate}
          onChange={(date: Date | null) => {
            setSelectedDate(date)
            if (onChange) {
              onChange(date)
            }
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          customInput={<input className="input-data" />}
          placeholderText="DD/MM/AAAA"
        />
        {selectedDate && (
          <img
            src={ClearIcon}
            alt=""
            className="clear-icon"
            onClick={() => setSelectedDate(null)}
          />
        )}
        <div
          className="calendar-icon"
          onClick={() => {
            // toogle para abrir e fechar o calendário clicando no ícone
            if (datePickerRef.current) {
              if (isOpen) {
                datePickerRef.current.setOpen(false)
                setIsOpen(false)
              } else {
                datePickerRef.current.setOpen(true)
                setIsOpen(true)
              }
            }
          }}
        >
          <img src={CalendarIcon} alt="" />
        </div>
      </div>
    </div>
  )
}
