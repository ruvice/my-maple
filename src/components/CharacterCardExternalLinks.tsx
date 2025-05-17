import React, { useMemo } from 'react'
import MapleGGLogo from '../assets/MapleGGLogo'
import mapleScouterSEALogo from '../assets/maplescouter_logo.png'
import mapleScouterLogo from '../assets/maplescouter.png'
import mapleStalkerSeaLogo from '../assets/maplestalkersea_logo.png'
import seaRankLogo from '../assets/searanks.png'
import { useViewStore } from '../store/useCharacterViewStore'
import { Character, MapleServer } from '@ruvice/my-maple-models'
import "./CharacterCardExternalLinks.css"

type CharacterCardExternalLinksProps = {
    character: Character
}

function CharacterCardExternalLinks(props: CharacterCardExternalLinksProps) {
    const { currentServer } = useViewStore();
    const { character } = props;
    const mapleSeaScouterURL = 'https://www.mapleseascouter.com/character/' + character.ocid
    const mapleStalkerSeaURL = 'https://www.maplestalkersea.com/equipment?character=' + character.name
    const mapleGGURL = 'https://msea.maple.gg/u/' + character.name
    const mapleScouterURL = 'https://maplescouter.com/info?name=' + character.name
    const seaRanksURL = 'https://searanks.org/char/' + character.name
    const logos = useMemo(() => {
        if (currentServer === MapleServer.KMS) {
            return (
                <>
                    <img className="character-card-logo-image character-card-logo" src={mapleScouterLogo} style={{width: 28, height: 14}} alt="MapleScouter" onClick={() => window.open(mapleScouterURL, '_blank')}/>
                </>
            )
        } else if (currentServer === MapleServer.SEA) {
            return (
                <>
                    <img className="character-card-logo-image character-card-logo" src={seaRankLogo} alt="SeaRanks" onClick={() => window.open(seaRanksURL, '_blank')}/>
                    <img className="character-card-logo-image character-card-logo" src={mapleScouterSEALogo} alt="MapleScouter" onClick={() => window.open(mapleSeaScouterURL, '_blank')}/>
                    <img className="character-card-logo-image character-card-logo" src={mapleStalkerSeaLogo} alt="MapleStalkerSEA" onClick={() => window.open(mapleStalkerSeaURL, '_blank')}/>
                    <MapleGGLogo className="character-card-logo" onClick={() => window.open(mapleGGURL, '_blank')} />
                </>
            )
        }
    }, [currentServer])
  return (
    <div className='character-card-logo-container'>
        {logos}
    </div>
  )
}

export default CharacterCardExternalLinks