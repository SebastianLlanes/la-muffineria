import {
  collection, addDoc, updateDoc,
  deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

const COL = 'pedidos'

export function suscribirPedidos(callback) {
  const q = query(collection(db, COL), orderBy('creadoEn', 'desc'))
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

// ── Normaliza el payload de BoxBuilder al esquema unificado ──
export async function registrarPedido({ cliente, items, total, applyDiscount, savings }) {
  await addDoc(collection(db, COL), {
    origen:        'web',
    estado:        'pendiente',
    creadoEn:      serverTimestamp(),
    fecha:         serverTimestamp(),   // fix: suscribirPedidos ordena por fecha
    fechaEntrega:  null,

    cliente,
    tipoCliente:   'particular',
    telefono:      '',

    items: items.map(item => ({
      recetaId:       '',
      nombre:         item.size ? `${item.name} (${item.size})` : item.name,
      cantidad:       item.quantity,
      precioUnitario: item.precio,
      costoPorUnidad: 0,
      size:           item.size ?? null,
    })),

    totalVenta:    total,
    totalCosto:    0,
    totalGanancia: 0,
    margen:        0,

    applyDiscount: applyDiscount ?? false,
    savings:       savings ?? 0,

    notas: '',
  })
}

export async function actualizarEstado(id, estado) {
  await updateDoc(doc(db, COL, id), { estado })
}