
import Link from "next/link"
export default function PostTranslations({translations}){
    const translationText = {
        "de" : "Auf Deutsch Lesen 🇩🇪",
        'es' : 'Leer en Español 🇪🇸', 
        'en'  : 'Read in English 🇺🇸' 

    }
    return (
    <ul>
        {
            translations.map(translation => {
                return (
                    <li key={translation.language.code}>
                        <Link href={translation.uri} locale={translation.language.code.toLowerCase()}>
                        <a>{translationText[translation.language.code.toLowerCase()]}</a>
                        </Link>
                    </li>
                ) 
            })
        }
    </ul>
    )
}