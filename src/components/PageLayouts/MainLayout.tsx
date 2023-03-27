
import "./Layouts.scss";
export default function MainLayout({children , coustomClassName} : { coustomClassName? : string, children : any}) {
  return (
    <div className={`mainLayout ${coustomClassName}`}>
     {children}
    </div>
  )
}
