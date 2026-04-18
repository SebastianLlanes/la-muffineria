import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

const COL = 'pedidos'

export async function registrarPedido(datosPedido) {
  const pedido = {
    ...datosPedido,
    fecha:  serverTimestamp(),
    estado: 'nuevo',
    origen: 'web',
  }
  const docRef = await addDoc(collection(db, COL), pedido)
  return docRef.id
}