import  { HtmlHTMLAttributes } from 'react'
import "./Layouts.scss";
export default function LeftLayout({children , leftLayoutProps , coustomClassName} : {coustomClassName? : "leftLayout5_5" | "leftLayout7_3" , children : any , leftLayoutProps? : HtmlHTMLAttributes<any>}) {
  return (
    <div className={`leftLayout2_6 ${leftLayoutProps?.className ?  leftLayoutProps.className : ""} ${coustomClassName && coustomClassName}`}>
     {children}
    </div>
  )
}
