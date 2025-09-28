import Hero from '../assets/class/Hero.png';
import Paladin from '../assets/class/Paladin.png';
import DarkKnight from '../assets/class/DarkKnight.png';
import SoulMaster from '../assets/class/SoulMaster.png';
import Mihile from '../assets/class/Mihile.png';
import Blaster from '../assets/class/Blaster.png';
import DemonSlayer from '../assets/class/DemonSlayer.png';
import DemonAvenger from '../assets/class/DemonAvenger.png';
import Aran from '../assets/class/Aran.png';
import Kaiser from '../assets/class/Kaiser.png';
import Adele from '../assets/class/Adele.png';
import Zero from '../assets/class/Zero.png';
import ArchMageFP from '../assets/class/ArchMageFP.png';
import ArchMageIL from '../assets/class/ArchMageIL.png';
import Bishop from '../assets/class/Bishop.png';
import FlameWizard from '../assets/class/FlameWizard.png';
import BattleMage from '../assets/class/BattleMage.png';
import Evan from '../assets/class/Evan.png';
import Luminous from '../assets/class/Luminous.png';
import Illium from '../assets/class/Illium.png';
import Lara from '../assets/class/Lara.png';
import Kinesis from '../assets/class/Kinesis.png';
import Bowmaster from '../assets/class/Bowmaster.png';
import CrossbowMaster from '../assets/class/CrossbowMaster.png';
import Pathfinder from '../assets/class/Pathfinder.png';
import WindBreaker from '../assets/class/WindBreaker.png';
import WildHunter from '../assets/class/WildHunter.png';
import Mercedes from '../assets/class/Mercedes.png';
import Kaine from '../assets/class/Kaine.png';
import NightLord from '../assets/class/NightLord.png';
import Shadower from '../assets/class/Shadower.png';
import BladeMaster from '../assets/class/BladeMaster.png';
import NightWalker from '../assets/class/NightWalker.png';
import Xenon from '../assets/class/Xenon.png';
import Phantom from '../assets/class/Phantom.png';
import Cadena from '../assets/class/Cadena.png';
import Khali from '../assets/class/Khali.png';
import HoYoung from '../assets/class/HoYoung.png';
import Viper from '../assets/class/Viper.png';
import Captain from '../assets/class/Captain.png';
import CannonMaster from '../assets/class/CannonMaster.png';
import Striker from '../assets/class/Striker.png';
import Mechanic from '../assets/class/Mechanic.png';
import Eunwol from '../assets/class/Eunwol.png';
import AngelicBuster from '../assets/class/AngelicBuster.png';
import Ark from '../assets/class/Ark.png';
import Hayato from '../assets/class/Hayato.png';
import Kanna from '../assets/class/Kanna.png';
import Bowman from '../assets/class/bowman.png'
import Len from '../assets/class/Len.png';
import Thief from '../assets/class/thief.png'
import Pirate from '../assets/class/pirate.png'
import Magician from '../assets/class/magician.png'
import Warrior from '../assets/class/warrior.png'
import { CharacterClass } from '@ruvice/my-maple-models';

export const imageMap: Record<CharacterClass, string> = {
    [CharacterClass.Hero]: Hero,
    [CharacterClass.Paladin]: Paladin,
    [CharacterClass.DarkKnight]: DarkKnight,
    [CharacterClass.SoulMaster]: SoulMaster,
    [CharacterClass.Mihile]: Mihile,
    [CharacterClass.Blaster]: Blaster,
    [CharacterClass.DemonSlayer]: DemonSlayer,
    [CharacterClass.DemonAvenger]: DemonAvenger,
    [CharacterClass.Aran]: Aran,
    [CharacterClass.Kaiser]: Kaiser,
    [CharacterClass.Adele]: Adele,
    [CharacterClass.Zero]: Zero,
    [CharacterClass.ArchMageFP]: ArchMageFP,
    [CharacterClass.ArchMageIL]: ArchMageIL,
    [CharacterClass.Bishop]: Bishop,
    [CharacterClass.FlameWizard]: FlameWizard,
    [CharacterClass.BattleMage]: BattleMage,
    [CharacterClass.Evan]: Evan,
    [CharacterClass.Luminous]: Luminous,
    [CharacterClass.Illium]: Illium,
    [CharacterClass.Lara]: Lara,
    [CharacterClass.Kinesis]: Kinesis,
    [CharacterClass.Bowmaster]: Bowmaster,
    [CharacterClass.CrossbowMaster]: CrossbowMaster,
    [CharacterClass.Pathfinder]: Pathfinder,
    [CharacterClass.WindBreaker]: WindBreaker,
    [CharacterClass.WildHunter]: WildHunter,
    [CharacterClass.Mercedes]: Mercedes,
    [CharacterClass.Kaine]: Kaine,
    [CharacterClass.NightLord]: NightLord,
    [CharacterClass.Shadower]: Shadower,
    [CharacterClass.BladeMaster]: BladeMaster,
    [CharacterClass.NightWalker]: NightWalker,
    [CharacterClass.Xenon]: Xenon,
    [CharacterClass.Phantom]: Phantom,
    [CharacterClass.Cadena]: Cadena,
    [CharacterClass.Khali]: Khali,
    [CharacterClass.HoYoung]: HoYoung,
    [CharacterClass.Viper]: Viper,
    [CharacterClass.Captain]: Captain,
    [CharacterClass.CannonMaster]: CannonMaster,
    [CharacterClass.Striker]: Striker,
    [CharacterClass.Mechanic]: Mechanic,
    [CharacterClass.Eunwol]: Eunwol,
    [CharacterClass.AngelicBuster]: AngelicBuster,
    [CharacterClass.Ark]: Ark,
    [CharacterClass.Hayato]: Hayato,
    [CharacterClass.Kanna]: Kanna,
    [CharacterClass.Len]: Len
};

export const backgroundMap: Record<CharacterClass, string> = {
    [CharacterClass.Hero]: Warrior,
    [CharacterClass.Paladin]: Warrior,
    [CharacterClass.DarkKnight]: Warrior,
    [CharacterClass.SoulMaster]: Warrior,
    [CharacterClass.Mihile]: Warrior,
    [CharacterClass.Blaster]: Warrior,
    [CharacterClass.DemonSlayer]: Warrior,
    [CharacterClass.DemonAvenger]: Warrior,
    [CharacterClass.Aran]: Warrior,
    [CharacterClass.Kaiser]: Warrior,
    [CharacterClass.Adele]: Warrior,
    [CharacterClass.Zero]: Warrior,
    [CharacterClass.ArchMageFP]: Magician,
    [CharacterClass.ArchMageIL]: Magician,
    [CharacterClass.Bishop]: Magician,
    [CharacterClass.FlameWizard]: Magician,
    [CharacterClass.BattleMage]: Magician,
    [CharacterClass.Evan]: Magician,
    [CharacterClass.Luminous]: Magician,
    [CharacterClass.Illium]: Magician,
    [CharacterClass.Lara]: Magician,
    [CharacterClass.Kinesis]: Magician,
    [CharacterClass.Bowmaster]: Bowman,
    [CharacterClass.CrossbowMaster]: Bowman,
    [CharacterClass.Pathfinder]: Bowman,
    [CharacterClass.WindBreaker]: Bowman,
    [CharacterClass.WildHunter]: Bowman,
    [CharacterClass.Mercedes]: Bowman,
    [CharacterClass.Kaine]: Bowman,
    [CharacterClass.NightLord]: Thief,
    [CharacterClass.Shadower]: Thief,
    [CharacterClass.BladeMaster]: Thief,
    [CharacterClass.NightWalker]: Thief,
    [CharacterClass.Xenon]: Thief,
    [CharacterClass.Phantom]: Thief,
    [CharacterClass.Cadena]: Thief,
    [CharacterClass.Khali]: Thief,
    [CharacterClass.HoYoung]: Thief,
    [CharacterClass.Viper]: Pirate,
    [CharacterClass.Captain]: Pirate,
    [CharacterClass.CannonMaster]: Pirate,
    [CharacterClass.Striker]: Pirate,
    [CharacterClass.Mechanic]: Pirate,
    [CharacterClass.Eunwol]: Pirate,
    [CharacterClass.AngelicBuster]: Pirate,
    [CharacterClass.Ark]: Pirate,
    [CharacterClass.Hayato]: Warrior,
    [CharacterClass.Kanna]: Magician,
    [CharacterClass.Len]: Warrior
  };
