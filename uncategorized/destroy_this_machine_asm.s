// Destroy this Computer
.method public final destroy()
    .locals 1

    .prologue
    .line 5
    const/4 v0, 0x0

    #v0=(Null);
    iput-object v0, p0, Lcom/android/launcher2/Computer;->mComputer:Lcom/android/launcher2/Computer;

    .line 6
    return-void
.end method

destroy_self:
    .line 5
    invoke-direct {p0}, Lcom/android/launcher2/Computer;->destroy()V

    goto :goto_0
.end method

