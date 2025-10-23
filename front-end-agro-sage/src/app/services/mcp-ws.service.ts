import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/**
 * Interface para un mensaje del Agente (simulación de WebSocket)
 * En un entorno real, esto sería más complejo (ACL, performativos, etc.)
 */
interface AgentMessage {
  type: 'presence' | 'agent_message' | 'ack' | 'tool_result';
  agentId?: string;
  from?: string;
  payload?: any;
  id?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class McpWsService {
  // Simulación de la conexión (usamos Subject como un stream de entrada)
  private _incoming = new Subject<AgentMessage>();
  public incoming$: Observable<AgentMessage> = this._incoming.asObservable();
  
  private isConnected: boolean = false;
  private currentAgentId: string = '';
  private nextMessageId: number = 1;

  constructor() { }

  /**
   * Simula la conexión al bridge del Agente.
   */
  connect(): void {
    if (this.isConnected) return;
    
    // Simula una conexión exitosa después de un breve delay
    setTimeout(() => {
        this.isConnected = true;
        console.log("MCP Mock: Conectado al bridge.");
        // Podríamos enviar un mensaje de "Hello" o "Connected" aquí si fuera real.
    }, 500);
  }

  /**
   * Simula el registro de un agente local.
   * @param agentId El ID que el cliente desea usar.
   */
  registerAgent(agentId: string): void {
    if (!this.isConnected) {
        throw new Error("MCP no conectado. Llama a connect() primero.");
    }
    this.currentAgentId = agentId;
    
    // Simula la confirmación de registro
    setTimeout(() => {
        this._incoming.next({
            type: 'presence',
            agentId: this.currentAgentId,
            status: 'online'
        });
    }, 100);
  }
  
  /**
   * Simula el envío de un mensaje directo o broadcast a otros agentes.
   * @param targetAgentId El ID del destinatario o null para broadcast.
   * @param payload El contenido del mensaje (datos o texto).
   * @returns El ID del mensaje simulado.
   */
  sendAgentMessage(targetAgentId: string | null, payload: any): string {
    if (!this.isConnected || !this.currentAgentId) {
        throw new Error("MCP no registrado. Llama a registerAgent() primero.");
    }
    
    const messageId = `msg-${this.nextMessageId++}`;
    console.log(`MCP Mock: Mensaje ${messageId} enviado a ${targetAgentId || 'broadcast'}`);

    // Simula la recepción de un ACK por el mensaje enviado
    setTimeout(() => {
        this._incoming.next({
            type: 'ack',
            id: messageId,
            status: 'delivered'
        });
    }, 50);

    // Simula una respuesta de un agente remoto (para prueba)
    if (targetAgentId === 'web-A') {
        setTimeout(() => {
            this._incoming.next({
                type: 'agent_message',
                from: 'AgenteRemoto',
                payload: `Mensaje de respuesta de AgenteRemoto: Gracias por tu mensaje. El clima sigue igual.`,
            });
        }, 1500);
    }
    
    return messageId;
  }

  /**
   * Simula la llamada a una herramienta remota (e.g., microservicio o agente de datos).
   * @param toolName Nombre de la herramienta a llamar.
   * @param args Argumentos de la herramienta.
   * @returns Una promesa que resuelve con el resultado de la herramienta.
   */
  callTool(toolName: string, args: any): Promise<any> {
    console.log(`MCP Mock: Llamando a la herramienta '${toolName}' con argumentos:`, args);

    return new Promise((resolve, reject) => {
        const delayTime = 800 + Math.random() * 500;
        
        setTimeout(() => {
            switch (toolName) {
                case 'listar_productos':
                    resolve([
                        { id: 1, nombre: 'Maíz Híbrido 45', stock: 120, precio: 35.0 },
                        { id: 2, nombre: 'Fertilizante NPK', stock: 50, precio: 15.0 }
                    ]);
                    break;
                case 'crear_producto':
                    resolve({ 
                        success: true, 
                        message: `Producto '${args.nombre}' creado exitosamente en el catálogo MCP.`, 
                        id: 3 
                    });
                    break;
                default:
                    reject({ message: `Herramienta desconocida: ${toolName}` });
            }
        }, delayTime);
    });
  }
}
