import styled from 'styled-components'

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 28px;
`

export const Item = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`

export const TaskDate = styled.div`
  flex: 0 0 auto;
  width: 80px;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.15px;
  color: #1d1d1d;
  min-height: 60px;
  background: #f2f2f2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TaskContent = styled.div`
  overflow: hidden;
`

export const TaskTitle = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const TaskDescription = styled.p`
  margin-top: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #1d1d1d;
`
