// app/page.tsx
import Header from '../component/header';
import AnimatedCarImage from '../component/animatedcarimages';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main style={{
        background: '#2563EB',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem 8%',
      }}>
        <section>
          <h1 style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: '3.1rem',
            marginBottom: '2rem',
            lineHeight: 1.1,
          }}>
            Rent your dream car<br /> in a click.
          </h1>
          <p style={{
            color: '#fff',
            fontSize: 21,
            maxWidth: 600,
            marginBottom: '2.6rem',
            lineHeight: 1.5,
            opacity: 0.85,
          }}>
            You can rent all type of vehicle and for many occasion.
            And in many agencies.
          </p>
          <button style={{
            background: '#F76513',
            color: '#fff',
            border: 'none',
            borderRadius: '0.8rem',
            padding: '1rem 2rem',
            fontWeight: 700,
            fontSize: 19,
            cursor: 'pointer'
          }}>
            Join Us Now
          </button>
        </section>
        <section>
        <AnimatedCarImage />
      </section>
        








      


      
      </main>
    </div>
  );
}





