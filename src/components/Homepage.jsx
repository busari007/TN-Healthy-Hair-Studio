import Section1 from './Sections/Section1'
import Section2 from './Sections/Section2'
import Section3 from './Sections/Section3'
import Section6 from './Sections/Section6'

export default function Homepage(){
    return(
        <div className="w-full">
                <Section1/>
                <Section2/>
                <Section3/>
                <Section6/>
        </div>
    );
}