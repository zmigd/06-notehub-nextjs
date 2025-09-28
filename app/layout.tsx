import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'NoteHub',
  description: 'Simple and efficient note management app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
