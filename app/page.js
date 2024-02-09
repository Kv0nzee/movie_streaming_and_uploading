import getBillboard from './actions/getBillboard';
import Billboard from './components/Billboard';
import useInfoModalStore from './hooks/useInfoModalStore';

export default async function Home() {
  const data = await  getBillboard();
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Billboard data={data}/>
    </main>
  );
}
