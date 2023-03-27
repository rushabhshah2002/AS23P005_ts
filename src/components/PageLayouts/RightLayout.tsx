import { HtmlHTMLAttributes } from 'react'

export default function RightLayout({children , rightLayoutProps , coustomClassName} : {coustomClassName? : string , children : any , rightLayoutProps? : HtmlHTMLAttributes<any>}) {
  return (
    <div className={` rightLayout2_6 ${rightLayoutProps?.className ? rightLayoutProps.className : ""} ${coustomClassName && coustomClassName}`}>
     {children}
    </div>
  )
}
