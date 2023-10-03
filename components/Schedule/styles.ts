import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  min-width: 32px;
  padding: 4px;

  & svg {
    height: 24px;
    width: 24px;
  }

  &:disabled {
    opacity: 0.5;
  }
`

export const Week = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;

  & > li {
    flex: 1;
    min-width: 190px;
    max-width: 220px;
  }
`

export const DayWrapper = styled.div`
  background: #f2f2f2;
  border-radius: 20px;
  overflow: hidden;
  max-height: 240px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 242px;
`

export const DayTitle = styled.h3`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #000000;
  flex: 0 0 auto;
`

export const DayInner = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1;
  gap: 6px;
`

export const LectureWrapper = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const LectureTitle = styled.h5`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1px;
  color: #1d1d1d;
`

export const LectureFooter = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1px;
  color: #1d1d1d;

  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`

export const LectureType = styled.div`
  flex: 1;
`

export const LectureTime = styled.div`
  flex: 0 0 auto;
`
