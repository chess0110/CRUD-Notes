// src/app/api/notes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

type Params = { 
  params: { 
    id: string
  } 
};

// POST /api/notes


export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Solo actualizamos campos presentes
    const data: any = {};
    if (typeof body.title === 'string') data.title = body.title;
    if (typeof body.content === 'string') data.content = body.content;
    if (typeof body.key === 'string') data.key = body.key;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No hay campos para actualizar' }, { status: 400 });
    }

    const updated = await prisma.note.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (e: any) {
    // Prisma lanza error P2025 si no encuentra el registro
    if (e.code === 'P2025') {
      return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    }
    console.error('Error en PUT /api/notes/:id', e);
    return NextResponse.json({ error: 'Error al actualizar la nota' }, { status: 500 });
  }
}


export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const deleted = await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Nota eliminada', deleted });
  } catch (e: any) {
    // Prisma lanza error P2025 si no encuentra el registro
    if (e.code === 'P2025') {
      return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    }
    console.error('Error en DELETE /api/notes/:id', e);
    return NextResponse.json({ error: 'Error al eliminar la nota' }, { status: 500 });
  }
}


export async function GET(_req: Request,{ params }: Params) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const data = await prisma.note.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error al obtener la nota:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
