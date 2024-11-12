import './logoFutbol.css';
import Link from 'next/link';

export default function Logo(){
  return (
    <Link href="/" >
      <div className="footballLogo">
        <div className="halfLine"></div>
        <div className="centerCircle"></div>
        <div className="penaltyBox left"></div>
        <div className="goalBox left"></div>
        <div className="penaltyBox right"></div>
        <div className="goalBox right"></div>
      </div>
    </Link>
  );
};