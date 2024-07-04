import Image from 'react'
import Logo from '../img/Logo.png?url'

const PokedexHeader = () => {
    return(
        <section className="sticky top-0 right-10 w-full h-24 flex items-center justify-center  bg-gradient-to-l 
        from-yellow-500 via-red-400 to-yellow-400 animation z-10">
            <img
                alt="Logo Pokedex"
                src={Logo}
                width={200}
            />
        </section>   
    )
}

export default PokedexHeader;