class customButton
{
    constructor(x, y, w, h, accountNumber)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.accountNumber = accountNumber;
    }

    show()
    {
        rect(this.x, this.y, this.w, this.h);
    }

    clicked()
    {
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h)
        {
            
        }
    }

}