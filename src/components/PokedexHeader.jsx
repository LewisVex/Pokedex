import Image from 'react'
import Logo from '../img/Logo.png?url'

const PokedexHeader = () => {
    return(
        <section className="sticky top-0 right-10 w-full h-24 flex flex-col items-center justify-center  bg-gradient-to-l 
        from-blue-500 via-purple-600 to-blue-800 animation z-10">
            <img
                alt="Logo Pokedex"
                src={Logo}
                width={200}
            />
        </section>   
    )
}

export default PokedexHeader;