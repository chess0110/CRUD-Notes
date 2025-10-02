// src/app/api/notes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (e: any) {
    // Log útil en desarrollo
    console.error('GET /api/notes error:', e);

    // Respuesta genérica de error del servidor
    return NextResponse.json(
      { error: 'Error al obtener notas' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    //console.log(body)
    const { key, title, content } = body;

    if (!key || !title || !content) {
      return NextResponse.json(
        { error: 'key, title y content son obligatorios' },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: { key, title, content },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (e: any) {
    console.error('Error en POST /api/notes:', e);
    return NextResponse.json(
      { error: 'Error al crear la nota' },
      { status: 500 }
    );
  }
}


