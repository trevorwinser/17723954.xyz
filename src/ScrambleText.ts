export interface ScrambleOptions {
    target: string;
    duration?: number;
    fps?: number;
    chars?: string;
}

export class ScrambleText {
    private element: HTMLElement;
    private targetText: string;
    private chars: string;
    private frameRequest: number = 0;
    private frame: number = 0;
    private queue: { from: string, to: string, start: number, end: number, char?: string }[] = [];
    private fpsInterval: number;
    private then: number = 0;

    constructor(element: HTMLElement, options: ScrambleOptions) {
        this.element = element;
        this.targetText = options.target;
        this.chars = options.chars || '0123456789!@#$%&*()';
        this.fpsInterval = 1000 / (options.fps || 40);
    }

    public start(): void {
        const length = Math.max(this.targetText.length, this.element.innerText.length);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = this.element.innerText[i] || '';
            const to = this.targetText[i] || '';
            const start = Math.floor(Math.random() * 20); 
            const end = start + Math.floor(Math.random() * 40) + 20; 
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.element.innerHTML = '';
        this.then = performance.now();
        this.update();
    }

    private update = (): void => {
        const now = performance.now();
        const elapsed = now - this.then;

        if (elapsed > this.fpsInterval) {
            this.then = now - (elapsed % this.fpsInterval);
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-dim">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.element.innerHTML = output;

            if (complete === this.queue.length) {
                this.element.innerHTML = this.targetText;
                return;
            }
            
            this.frame++;
        }

        this.frameRequest = requestAnimationFrame(this.update);
    }
}
