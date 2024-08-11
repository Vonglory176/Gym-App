import React from 'react'
import SectionWrapper from './SectionWrapper'

const Generator = (props: { children: React.ReactNode }) => {
  return (
    <SectionWrapper header="Generate your workout" title={['It\'s', 'Huge', 'o\'clock']}>
      <div className='min-h-screen'>
        
      </div>
    </SectionWrapper>
  )
}

export default Generator