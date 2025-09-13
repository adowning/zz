// 65a01f6a-c8fb-43b6-ba9a-2fc0033049ca

function NeutrinoEffect(ctx) {

	var Db = this;

	var ne = function (Ld, Bd) {
		this.Ld = Ld;
		this.Bd = Bd;

		if (this.Bd.we.pe.length > 0) {
			this.we = this.Bd.we.pe[0];

			this.Lc = [ne.prototype.Ec,
				ne.prototype.Fc][this.we.xe];
		}
		else
			this.we = null;
	}

	ne.prototype = {
		Ec: function (fe, Ab, Xb) {
			var Gc = ctx.ib(Xb.Md);
			var Hc = Math.cos(Gc);
			var Ic = Math.sin(Gc);
			var ye = ctx.Ae(Xb.Nd[0]);
			var ze = ctx.Ae(Xb.Nd[1]);
			fe./**/transform(ye * Hc, ye * Ic, ze * -Ic, ze * Hc, Ab[0], Ab[1]);
		},

		Fc: function (fe, Ab, Xb) {
			var q = Xb.Mc;
			var z2 = 2.0 * q[2] * q[2];
			var xy = 2.0 * q[0] * q[1];
			var wz = 2.0 * q[3] * q[2];
			var ye = ctx.Ae(Xb.Nd[0]);
			var ze = ctx.Ae(Xb.Nd[1]);
			fe./**/transform(
				ye * (1.0 - 2.0 * q[1] * q[1] - z2),
				ye * (xy + wz),
				ze * (wz - xy),
				ze * (2.0 * q[0] * q[0] + z2 - 1.0),
				Ab[0], Ab[1]);
		},

		Pc: function (fe, Xb, ge) {
			Xb.vc(fe, -1, ge);

			if (this.we) {

				if (this.Be != null && !Xb.oc) {

					if (Xb.Od > 0.001) {
						var De = Math.floor(Xb.Qc % this.we.Rc);
						var Ee = Math.floor(Xb.Qc / this.we.Rc);

						var Ab = Xb.Ab.slice();
						var Nd = Xb.Nd.slice();
						if (!ge || ge./**/transform(Ab, Nd)) {

							var df = Math.abs(Nd[0]);
							var ef = Math.abs(Nd[1]);

							if (df > 0.001 && ef > 0.001) {						
								fe.save();
								this.Lc(fe, Ab, Xb);
								
								fe.translate(-df * Xb.Pd[0], -ef * (1 - Xb.Pd[1]));
								fe.globalAlpha = Xb.Od;

								if (Xb.gf[0] < 0.999 || Xb.gf[1] < 0.999 || Xb.gf[2] < 0.999) {

									var Ye = df < this.Tc ? df : this.Tc;
									var Ze = ef < this.Uc ? ef : this.Uc;

									ctx.af(Ye, Ze);

									ctx.bf.globalCompositeOperation = "copy";
									ctx.bf.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc,
										0, 0, Ye, Ze);

									ctx.bf.globalCompositeOperation = "multiply";
									ctx.bf.fillStyle = ctx.ff(Xb.gf);
									ctx.bf.fillRect(0, 0, Ye, Ze);

									ctx.bf.globalCompositeOperation = "destination-atop";
									ctx.bf.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc,
										0, 0, Ye, Ze);

									fe.drawImage(ctx.cf, 0, 0, Ye, Ze, 0, 0, df, ef);
								}
								else {
									fe.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc, 0, 0, df, ef);
								}

								fe.restore();
							}
						}
					}
				}
			}

			Xb.vc(fe, 1, ge);
		},

		Hd: function (fe, ge) {
			fe.save();

			if (this.we) {
				fe.globalCompositeOperation = this.Ld.materials[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].materialIndex];
				this.Be = this.Ld.textureDescs[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].textureIndices[0]];
			}
			else {
				this.Be = null;
			}

			if (this.Be) {
				this.Tc = this.Be.width / this.we.Rc;
				this.Uc = this.Be.height / this.we.Sc;
			}

			function kd(a, b) {
				if (a.Ab[2] < b.Ab[2])
					return 1;
				if (a.Ab[2] > b.Ab[2])
					return -1;
				return 0;
			}

			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
				case 2:
					this.Bd.tc.sort(kd);

					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
			}

			fe.restore();
		}
	}

	var oe = function (Ld, Bd) {

		this.Ld = Ld;
		this.Bd = Bd;

		if (this.Bd.we.pe.length > 0)
			this.we = this.Bd.we.pe[0];
		else
			this.we = null;

		this.vertex = [
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] }];
	}

	oe.prototype = {
		qe: function (Xb, se, re, te, renderBuffer) {
			Xb.Ce(-1, se, re, te, renderBuffer);

			if (this.we) {

				if (!Xb.oc) {

					var v0 = this.vertex[0];
					var v1 = this.vertex[1];
					var v2 = this.vertex[2];
					var v3 = this.vertex[3];

					var Fe = [], Ge = [];

					if (this.we.xe == 0) {
						var a = ctx.ib(Xb.Md);
						var s = Math.sin(a);
						var c = Math.cos(a);

						Fe[0] = se[0] * c + re[0] * s;
						Fe[1] = se[1] * c + re[1] * s;
						Fe[2] = se[2] * c + re[2] * s;

						Ge[0] = -se[0] * s + re[0] * c;
						Ge[1] = -se[1] * s + re[1] * c;
						Ge[2] = -se[2] * s + re[2] * c;
					}
					else {
						var q = Xb.Mc;
						var z2 = 2.0 * q[2] * q[2];
						var xy = 2.0 * q[0] * q[1];
						var wz = 2.0 * q[3] * q[2];

						Fe[0] = 1.0 - 2.0 * q[1] * q[1] - z2;
						Fe[1] = xy + wz;
						Fe[2] = 2.0 * q[0] * q[2] - 2.0 * q[3] * q[1];

						Ge[0] = xy - wz;
						Ge[1] = 1.0 - 2.0 * q[0] * q[0] - z2;
						Ge[2] = 2.0 * q[1] * q[2] + 2.0 * q[3] * q[0];
					}

					var He = [], Ie = [], Je = [], Ke = [];
					ctx.u(He, Fe, -Xb.Nd[0] * Xb.Pd[0]);
					ctx.u(Ie, Fe, Xb.Nd[0] * (1.0 - Xb.Pd[0]));
					ctx.u(Je, Ge, -Xb.Nd[1] * Xb.Pd[1]);
					ctx.u(Ke, Ge, Xb.Nd[1] * (1.0 - Xb.Pd[1]));

					ctx.c(v0./**/position, He, Je);
					ctx.c(v0./**/position, v0./**/position, Xb.Ab);
					ctx.c(v1./**/position, He, Ke);
					ctx.c(v1./**/position, v1./**/position, Xb.Ab);
					ctx.c(v2./**/position, Ie, Ke);
					ctx.c(v2./**/position, v2./**/position, Xb.Ab);
					ctx.c(v3./**/position, Ie, Je);
					ctx.c(v3./**/position, v3./**/position, Xb.Ab);

					{
						var rgb = ctx.v(Xb.gf, 255);
						v0./**/color = v1./**/color = v2./**/color = v3./**/color = [rgb[0], rgb[1], rgb[2], Xb.Od * 255];
					}

					{
						var De = Math.floor(Xb.Qc % this.we.Rc);
						var Ee = Math.floor(Xb.Qc / this.we.Rc);

						var Pe, Qe, Re, Se;

						var We = this.Ld.texturesRemap[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].textureIndices[0]];
						if (We) {
							var Ue = We.width / this.we.Rc;
							var Ve = We.height / this.we.Sc;

							var Pe = We.x + De * Ue;
							var Qe = Pe + Ue;
							var Re = (We.y + We.height - Ee * Ve);
							var Se = Re - Ve;
						} else {
							var Ue = 1.0 / this.we.Rc;
							var Ve = 1.0 / this.we.Sc;

							var Pe = De * Ue;
							var Qe = Pe + Ue;
							var Re = (1.0 - Ee * Ve);
							var Se = Re - Ve;
						}

						v0./**/texCoords[0] = [Pe, Se];
						v1./**/texCoords[0] = [Pe, Re];
						v2./**/texCoords[0] = [Qe, Re];
						v3./**/texCoords[0] = [Qe, Se];
					}

					renderBuffer.pushVertex(v0);
					renderBuffer.pushVertex(v1);
					renderBuffer.pushVertex(v2);
					renderBuffer.pushVertex(v3);

					if (!renderBuffer.__lastRenderCall) {
						renderBuffer.__lastRenderCall = new ctx.RenderCall(0, 6, this.we.renderStyleIndex);
					} else {
						var lastRenderCall = renderBuffer.__lastRenderCall;

						if (lastRenderCall.renderStyleIndex == this.we.renderStyleIndex) {
							lastRenderCall.numIndices += 6;
						} else {
							renderBuffer.pushRenderCall(lastRenderCall);
							renderBuffer.__lastRenderCall = new ctx.RenderCall(
								lastRenderCall.startIndex + lastRenderCall.numIndices,
								6, this.we.renderStyleIndex);
						}
					}
				}
			}

			Xb.Ce(1, se, re, te, renderBuffer);
		},

		ue: function (se, re, te, renderBuffer) {
			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.qe(this.Bd.tc[Wb], se, re, te, renderBuffer);
					}
					break;

				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.qe(this.Bd.tc[Wb], se, re, te, renderBuffer);
					}
					break;

				case 2:
					this.Bd.tc.forEach(function (Xb) {
						Xb.depth = ctx.H(te, Xb.Ab);
					});

					this.Bd.tc.sort(function (a, b) {
						if (a.depth < b.depth)
							return 1;
						if (a.depth > b.depth)
							return -1;
						return 0;
					});

					this.Bd.tc.forEach(function (Xb) {
						this.qe(Xb, se, re, te, renderBuffer);
					}, this);
					break;
			}
		}
	}

	var ld = function (Ld, we, ve) {
		var Vb = this;
		this.Ld = Ld;
		this.we = we;

		// Eb

		function Eb() {
			this.Fb = 0;
			this.Gb = 1;
			this.Hb = null;
			this.Ib = null;
			this.Kb = 0;
			this.Lb = 1;

			Vb.we.Mb(this); // IMPL

			this.Nb = function () {
				this.Ob = this.Gb;
				this.Fb = 0;
			}

			this.Nb();
		}

		Eb.prototype = {
			Jd: function () {
				this.Nb();
			},

			Id: function (Qb, Ab, Mc) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var Rb = Vb.Rb;
				var systemTime = Ld.Rb;
				var Sb = Qb;
				var ic = 0;

				if (this.zb > 0.000001) {

					var Tb = this.Ob + Qb * this.zb;

					while (Tb >= 1.0) {
						var Ub = this.zb < 0.001 ? 0.0 : (1.0 - this.Ob) / this.zb;
						Sb -= Ub;
						Rb += Ub;
						systemTime += Ub;

						if (this.Hb != null && Rb > this.Hb) {
							Vb.disactivate();
							break;
						}

						Vb.Rb = Rb;
						Ld.Rb = systemTime;

						if (Ab && Qb > 0)
							ctx.ab(Vb.Ab, Ab, Vb.Bb, Sb / Qb);

						if (Mc && Qb > 0)
							ctx.slerpq(Vb.Mc, Mc, Vb.prevRotation, Sb / Qb);

						// for the future when Jb would be external
						this.Lb = this.Jb;

						for (var Wb = 0; Wb < this.Jb; ++Wb) {
							if (Vb.sc.length == 0)
								break;

							if (this.Jb == 1)
								this.Kb = 0;
							else
								this.Kb = Wb / (this.Jb - 1);

							var Xb = Vb.sc.pop();
							Vb.tc.unshift(Xb);

							if (Wb == 0)
								Xb.Yb();
							else
								Xb.Zb();

							Xb.Id(Sb);
							++ic;
						}

						this.Ob = 0.0;
						Tb -= 1.0;

						if (this.Ib != null && ++this.Fb >= this.Ib) {
							Vb.disactivate();
							break;
						}
					}

					this.Ob = Tb;
				}
				Rb += Sb;
				Vb.Rb = Rb;

				if (Ab)
					ctx.T(Vb.Ab, Ab);

				if (Mc)
					ctx.T(Vb.Mc, Mc);

				return ic;
			}
		}

		// ac

		function ac() {
			this.Gb = 1;
			this.Kb = 0;
			this.Lb = 1;

			Vb.we.Mb(this); // IMPL

			this.Nb = function () {
				this.bc = this.Gb;
			}

			this.Nb();
		}

		ac.prototype = {
			Jd: function () {
				this.Nb();
			},

			Id: function (Qb, Ab, Mc) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var cc = Vb.Rb;
				var dc = cc + Qb;
				var systemTimeBeforeFrame = Ld.Rb;
				var systemTimeAfterFrame = systemTimeBeforeFrame + Qb;
				var ec = Ab ? ctx.O(ctx.h(Ab, Vb.Bb)) : 0;
				var ic = 0;

				if (ec > 0.000001) {
					var fc = ec / this.rd;
					var Tb = this.bc + fc;

					var hc = fc < 0.001 ?
						1.0 - this.bc : (1.0 - this.bc) / fc;

					var jc = [];

					while (Tb > 1.0) {
						var kc = cc + hc * Qb;

						if (Ab)
							ctx.ab(jc, Vb.Bb, Ab, hc);

						if (Mc)
							ctx.slerpq(currentEmitterRot, Vb.prevRotation, Mc, hc);

						Vb.Rb = kc;
						ctx.T(Vb.Ab, jc);
						Ld.Rb = ctx.X(systemTimeBeforeFrame, systemTimeAfterFrame, hc);

						// for the future when Jb would be external
						this.Lb = this.Jb;

						for (var Wb = 0; Wb < this.Jb; ++Wb) {
							if (Vb.sc.length == 0)
								break;

							if (this.Jb == 1)
								this.Kb = 0;
							else
								this.Kb = Wb / (this.Jb - 1);

							var Xb = Vb.sc.pop();
							Vb.tc.unshift(Xb);

							if (Wb == 0)
								Xb.Yb();
							else
								Xb.Zb();

							Xb.Id(Qb * (1.0 - hc));
							++ic;
						}

						hc += 1.0 / fc;
						Tb -= 1.0;
					}

					this.bc = Tb;
				}

				Vb.Rb = dc;

				if (Ab)
					ctx.T(Vb.Ab, Ab);

				if (Mc)
					ctx.U(Vb.Mc, Mc);

				return ic;
			}
		}

		// mc

		function mc() {
			this.Ab = [];
			this.Pd = [];
			this.Nd = [];
			this.gf = [];
			this.Kc = [];
		}

		mc.prototype = {
			nc: function () {
				this.oc = false;

				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];
					pc.Bd.Jd(this.Ab, null);

					if (pc.Ad.sd)
						pc.Bd.disactivate();
				}
			},

			Yb: function () {
				Vb.we.fd(Vb, this); // IMPL
				this.nc();
			},

			Zb: function () {
				Vb.we.gd(Vb, this); // IMPL
				this.nc();
			},

			Id: function (Qb) {
				Vb.we.qc(Qb, Vb, this); // IMPL

				this.rc(Qb);
			},

			pc: function (je) {
				return this.Kc[je].Bd;
			},

			rc: function (Qb) {
				for (var i = 0; i < this.Kc.length; i++) {
					this.Kc[i].Bd.Id(Qb, this.Ab, null);
				}
			},

			uc: function (md, nd) {
				this.Kc.push({
					Bd: new ld(Ld, md, ve),
					Ad: nd
				});
			},

			vc: function (fe, xc, ge) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.Hd(fe, ge);
				}
			},

			Ce: function (xc, se, re, te, renderBuffer) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.ue(se, re, te, renderBuffer);
				}
			},

			wc: function (fe) {
				this.oc = true;
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (pc.Ad.sd)
						pc.Bd.activate();
					else
						pc.Bd.disactivate();
				}
			},

			yc: function (Gd) {
				for (var i = 0; i < this.Kc.length; ++i) {
					this.Kc[i].Bd.Ed(Gd);
				}
			}
		}

		// zc

		function zc() {
		}

		zc.prototype.Ac = function (Xb) {
			return Vb.we.Cc(Vb, Xb, this); // IMPL
		}

		// ld Ad

		this.Ab = [];
		this.Bb = [];
		this.Mc = [];
		this.prevRotation = [];
		this.tc = [];
		this.sc = [];
		this.Wc = new zc();
		this.construct = new ve(this.Ld, this);
		this.Yc = [];
		this.ad = [];

		this.dd = function () {
			this.vd = new Eb();
		}

		this.ed = function () {
			this.vd = new ac();
		}

		this.we.ud(this); // IMPL

		for (var Wb = 0; Wb < this.jd; ++Wb) {
			var Xb = new mc();

			for (var id = 0; id < this.Yc.length; ++id) {
				var hd = this.Yc[id];
				Xb.uc(hd.Db, hd.Ad);
			}

			this.sc.push(Xb);
		}

		this.Nb = function (Ab, Mc) {

			ctx.T(this.Ab, Ab ? Ab : [0, 0, 0]);
			ctx.T(this.Bb, this.Ab);
			ctx.U(this.Mc, Mc ? Mc : [0, 0, 0, 1]);
			ctx.U(this.prevRotation, this.Mc);

			this.Rb = 0.0;
			this.wd = 0.0;
			this.Zc = true;
			this.paused_ = false;
			this.generatorsPaused_ = false;
			ctx.W(this.ad, 0, 0, 0);
		}
	}

	ld.prototype.Jd = function (Ab, Mc) {
		this.Nb(Ab, Mc);

		this.sc.push.apply(this.sc, this.tc);
		this.tc.length = 0;

		this.vd.Jd();
	}

	ld.prototype.Id = function (Qb, Ab, Mc) {

		if (this.paused_)
		{
			this.Td(Ab, Mc);
			return;
		}

		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			if (Qb > 0.0001) {
				var shift = [];
				ctx.g(shift, Ab, this.Bb);
				ctx.T(this.ad, shift);
				ctx.w(this.ad, this.ad, Qb);
			}
			else {
				ctx.W(this.ad, 0, 0, 0);
			}
		}
		else {
			ctx.W(this.ad, 0, 0, 0);
		}

		if (Mc)
		{
			ctx.U(this.prevRotation, this.Mc);
		}

		var ic;

		if (this.Zc && !this.generatorsPaused_) {
			ic = this.vd.Id(Qb, Ab, Mc);
		}
		else {
			if (Ab)
				ctx.T(this.Ab, Ab);

			if (Mc)
				ctx.U(this.Mc, Mc);

			ic = 0;
			this.Rb += Qb;
		}

		for (var Wb = ic; Wb < this.tc.length;) {
			var Xb = this.tc[Wb];

			if (!Xb.oc) {
				Xb.Id(Qb);

				if (this.Wc.Ac(this.tc[Wb])) {
					Xb.wc();

					if (this.xd(Wb))
						continue;
				}
			}
			else {
				Xb.rc(Qb);

				if (this.xd(Wb))
					continue;
			}

			++Wb;
		}
	};

	ld.prototype.xd = function (je) {
		var Xb = this.tc[je];

		var ready = true;

		for (var id = 0; id < Xb.Kc.length; ++id) {
			var Bd = Xb.Kc[id].Bd;

			if (Bd.activated() || Bd.tc.length > 0) {
				ready = false;
				break;
			}
		}

		if (ready) {
			this.sc.push(this.tc[je]);
			this.tc.splice(je, 1);
			return true;
		}

		return false;
	}

	ld.prototype.Hd = function (fe, ge) {
		this.construct.Hd(fe, ge);
	}

	ld.prototype.ue = function (se, re, te, renderBuffer) {
		this.construct.ue(se, re, te, renderBuffer);
	}

	ld.prototype.Td = function (Ab, Mc) {
		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			ctx.T(this.Ab, Ab);
		}

		if (Mc) {
			ctx.U(this.prevRotation, this.Mc);
			ctx.U(this.Mc, Mc);
		}
	}

	ld.prototype.uc = function (md, nd) {
		this.Yc.push({ Db: md, Ad: nd });
	}

	ld.prototype./**/pause = function () {
		this.paused_ = true;
	}

	ld.prototype./**/unpause = function () {
		this.paused_ = false;
	}

	ld.prototype./**/paused = function () {
		return this.paused_;
	}

	ld.prototype./**/pauseGenerators = function () {
		this.generatorsPaused_ = true;
	}

	ld.prototype./**/unpauseGenerators = function () {
		this.generatorsPaused_ = false;
	}

	ld.prototype./**/generatorsPaused = function () {
		return this.generatorsPaused_;
	}

	ld.prototype.activate = function () {
		this.Zc = true;
	}

	ld.prototype.disactivate = function () {
		this.Zc = false;
	}

	ld.prototype.activated = function () {
		return this.Zc;
	}
	
	ld.prototype./**/getNumParticles = function () {
		return this.tc.length;
	}

	var ke = function () {
		var Cb = this;

		this._init = function (we, Ab, Mc, ve) {
			this./**/model = we;

			this.Ab = [];
			this.Mc = [];

			// ke Ad

			this.od = [];

			this.pd = function (md) {
				var Bd = new ld(this, md, ve);
				Bd.Nb(this.Ab, this.Mc);
				this["_".concat(md.name)] = Bd;
				this.od.push(Bd);
			}

			this.Nb = function (Ab, Mc) {
				this.Cd = 0.0;
				this.Rb = 0.0;
				ctx.T(this.Ab, Ab ? Ab : [0, 0, 0]);
				ctx.U(this.Mc, Mc ? Mc : [0, 0, 0, 1]);
			}

			this.Nb(Ab, Mc);
			this./**/model.qd(this); // IMPL
			this.zeroUpdate();
			this./**/update(this.Ud, Ab, Mc);
		}
	}

	ke.prototype./**/restart = function (/**/position, /**/rotation) {

		this.Nb(/**/position ? /**/position : this.Ab, /**/rotation ? /**/rotation : this.Mc);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Jd(this.Ab, this.Mc);
		}

		this.zeroUpdate();

		this./**/update(this.Ud, this.Ab, this.Mc);
	}

	ke.prototype.zeroUpdate = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Id(0, this.Ab, this.Mc);
		}
	}

	ke.prototype./**/update = function (/**/dt, /**/position, /**/rotation) {
		var updatedTime = 0.0;
		var hc = [];
		ctx.T(hc, this.Ab);
		var frameRotation = [];
		ctx.U(frameRotation, this.Mc);

		if (/**/position && ctx.equalv3_(/**/position, this.Ab))
			/**/position = null;

		if (/**/rotation && ctx.equalq_(/**/rotation, this.Mc))
			/**/rotation = null;

		while ((/**/dt - updatedTime) + this.Cd >= this.Dd) {
			var cc = this.Rb;

			if (/**/position)
				ctx.ab(hc, this.Ab, /**/position, updatedTime / /**/dt);

			if (/**/rotation)
				ctx.slerpq(frameRotation, this.Mc, /**/rotation, updatedTime / /**/dt);

			for (var i = 0; i < this.od.length; ++i) {
				this.od[i].Id(this.Dd, hc, frameRotation);

				this.Rb = cc;
			}

			updatedTime += this.Dd - this.Cd;
			this.Cd = 0.0;
			this.Rb = cc + this.Dd;
		}

		if (/**/position)
			ctx.T(this.Ab, /**/position);

		if (/**/rotation)
			ctx.U(this.Mc, /**/rotation);

		this.Cd += /**/dt - updatedTime;
	}

	ke.prototype./**/resetPosition = function (/**/position, /**/rotation) {

		if (/**/position)
			ctx.T(this.Ab, /**/position);

		if (/**/rotation)
			ctx.U(this.Mc, /**/rotation);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Td(this.Ab, this.Mc);
		}
	}

	ke.prototype./**/setPropertyInAllEmitters = function (/**/name, /**/value) {
		var propName = "_".concat(/**/name);

		if (/**/value instanceof Array) {
			if (/**/value.length == 2) {
				for (var i = 0; i < this.od.length; ++i) {
					ctx.S(this.od[i][propName], /**/value);
				}
			}
			else {
				for (var i = 0; i < this.od.length; ++i) {
					ctx.T(this.od[i][propName], /**/value);
				}
			}
		}
		else {
			for (var i = 0; i < this.od.length; ++i) {
				this.od[i][propName] = /**/value;
			}
		}
	}

	ke.prototype./**/pauseAllEmitters = function() {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/pause();
		}
	}

	ke.prototype./**/unpauseAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/unpause();
		}
	}

	ke.prototype./**/areAllEmittersPaused = function () {
		for (var i = 0; i < this.od.length; ++i) {
			if (!this.od[i].paused())
				return false;
		}
		return true;
	}

	ke.prototype./**/pauseGeneratorsInAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/pauseGenerators();
		}
	}

	ke.prototype./**/unpauseGeneratorsInAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/unpauseGenerators();
		}
	}

	ke.prototype./**/areGeneratorsInAllEmittersPaused = function () {
		for (var i = 0; i < this.od.length; ++i) {
			if (!this.od[i].generatorsPaused())
				return false;
		}
		return true;
	}

	ke.prototype./**/getNumParticles = function() {
		var numParticles = 0;
		
		for (var i = 0; i < this.od.length; ++i) {
			numParticles += this.od[i].getNumParticles();
		}
		
		return numParticles;
	}
	

	var le = function () {
		this._init = function (we, Ab, Mc, renderBuffer) {
			le.prototype._init.call(this, we, Ab, Mc, oe);

			this.texturesRemap = [];

			var indices = [];

			{
				var verDisp;
				for (var Wb = 0; Wb < this./**/model.Xe; ++Wb) {
					verDisp = Wb * 4;
					indices.push(verDisp + 0, verDisp + 3, verDisp + 1, verDisp + 1, verDisp + 3, verDisp + 2);
				}
			}

			this.renderBuffer = renderBuffer;
			this.renderBuffer.initialize(this./**/model.Xe * 4, [2], indices, this./**/model.Xe);
			this.renderBuffer.__numIndices = 0;
		}
	}

	le.prototype = new ke();

	le.prototype./**/fillGeometryBuffers = function (/**/cameraRight, /**/cameraUp, /**/cameraDir) {
		this.renderBuffer.cleanup();
		this.renderBuffer.__lastRenderCall = null;

		this.od.forEach(function (Bd) {
			Bd.ue(/**/cameraRight, /**/cameraUp, /**/cameraDir, this.renderBuffer);
		}, this);

		if (this.renderBuffer.__lastRenderCall)
			this.renderBuffer.pushRenderCall(this.renderBuffer.__lastRenderCall);
	}

	var me = function () {
		this._init = function (we, Ab, Mc) {
			me.prototype._init.call(this, we, Ab, Mc, ne);

			this.materials = [];
			this./**/model.materials.forEach(function (value) {
				this.materials.push(['source-over', 'lighter', 'multiply'][value]);
			}, this);

			this./**/textureDescs = [];
		}
	}

	me.prototype = new ke();

	me.prototype./**/draw = function (/**/context, /**/camera) {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Hd(/**/context, /**/camera);
		}
	}

	this.createWGLInstance = function (/**/position, /**/rotation, /**/renderBuffer) {
		var Ld = new le();
		Ld._init(this, /**/position, /**/rotation, /**/renderBuffer);
		return Ld;
	}

	this.createCanvas2DInstance = function (/**/position, /**/rotation) {
		var Ld = new me();
		Ld._init(this, /**/position, /**/rotation);
		return Ld;
	}
	this.textures = Resources.readData("neutrinoEffects").rsSparks.texturePaths;
	this.materials = [1];
	this.renderStyles = [{materialIndex:0,textureIndices:[0]}];
	this.Xe = 100;

	function Emitter_sparks() {

		var _2s = [[9.97887, 9.73913], [19.9577, 9.73913], [49.8944, 29.2174], [29.9366, 9.73913], [19.9577, 19.4783], [29.9366, 29.2174], [39.9155, 29.2174], [29.9366, 19.4783], [19.9577, 29.2174], [9.97887, 19.4783]], _1, _2Srch, _2 = [], _3 = [], _5 = [], _8, _10 = [], _11=[], _11fs=[], _11vs=[], _11rw=[], _11rwn=[], _11rwl, _11v=[], _11p=[], _11dtl, _11dtp, _11df, _11fsd=[], _12, _13, _14, _14i0, _14s0 = [];
		this.pe = [{xe:0,Rc:1,Sc:1,renderStyleIndex:0}];
		this.name = "sparks";

		this.ud = function(Bd) {
			Bd.dd();
			Bd._14 = [
				[
					[0,1,1],
					[1,0,0]
				]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 14;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 14;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Bd.Ld.rand() * (1 - 0);
			_2Srch = this._2f(_1 * 174110);
			ctx.yb(_2, -675 + (_2Srch[0] % 142) * 9.97887, 68 + Math.floor(_2Srch[0] / 142) * 9.73913, _2s[_2Srch[1]], Bd.Ld.rand);
			ctx.W(_3, _2[0], _2[1], 0);
			Xb._4 = [];
			ctx.c(Xb._4, Bd.Ab, _3);
			ctx.randv3gen(_5, 100, Bd.Ld.rand);
			Xb._6 = [];
			ctx.T(Xb._6, _5);
			Xb._7 = 0;
			_8 = 5 + Bd.Ld.rand() * (9 - 5);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Bd.Ld.rand() * (1 - 0);
			_2Srch = this._2f(_1 * 174110);
			ctx.yb(_2, -675 + (_2Srch[0] % 142) * 9.97887, 68 + Math.floor(_2Srch[0] / 142) * 9.73913, _2s[_2Srch[1]], Bd.Ld.rand);
			ctx.W(_3, _2[0], _2[1], 0);
			Xb._4 = [];
			ctx.c(Xb._4, Bd.Ab, _3);
			ctx.randv3gen(_5, 100, Bd.Ld.rand);
			Xb._6 = [];
			ctx.T(Xb._6, _5);
			Xb._7 = 0;
			_8 = 5 + Bd.Ld.rand() * (9 - 5);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.W(_10, 250, -150, 0);
			ctx.T(_11fs, _10);
			ctx.T(_11vs, [0,0,0]);
			ctx.u(_11v, _11fs, Qb);
			ctx.c(_11v, _11v, Xb._6);
			ctx.u(_11p, _11v, Qb);
			ctx.c(_11p, _11p, Xb._4);
			ctx.T(Xb._4, _11p);
			ctx.T(Xb._6, _11v);
			ctx.T(Xb.Ab, Xb._4);
			_12 = 3;
			_13 = (Xb._ / _12);
			_14i0=(_13<0?0:(_13>1?1:_13));
			_14i0<0?ctx.V(_14s0,0,(_14i0-0)*inf):ctx.V(_14s0,1,(_14i0-0)*1);
			_14 = Db.nb(Bd._14[0][_14s0[0]],_14s0[1]);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._7;
			ctx.V(Xb.Nd,Xb._9,Xb._9);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = _14;
			Xb.Qc = 0;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_12 = 3;
			return Xb._ > _12;
		}

			this._2f = function(i) {
				return i<94109?i<49438?i<25559?i<24215?i<9768?i<4654?i<2388?i<1048?i<502?i<169?i<3?[1,0]:[143,0]:i<248?[2,0]:[144,0]:i<794?i<540?[284,0]:[285,0]:[286,0]:i<1880?i<1370?i<1193?[3,0]:[4,0]:[145,1]:[287,1]:i<3465?i<3370?i<2862?i<2683?i<2429?[426,0]:[427,0]:i<2684?[568,0]:[569,0]:[428,9]:i<3376?[711,0]:[712,0]:i<4483?i<3974?i<3720?[429,0]:[430,0]:i<4229?[571,0]:[572,0]:i<4592?[713,0]:[714,0]:i<7485?i<6084?i<5576?i<5066?i<4842?[5,0]:[6,0]:[147,1]:[289,1]:i<6977?i<6467?i<6298?[7,0]:[8,0]:[149,1]:[291,1]:i<8566?i<8502?i<7993?[431,1]:i<8247?[573,0]:[574,0]:i<8544?[715,0]:[716,0]:i<9584?i<9075?i<8821?[433,0]:[434,0]:i<9330?[575,0]:[576,0]:i<9623?[717,0]:[718,0]:i<15165?i<14989?i<11335?i<11227?i<10467?i<10386?i<9896?i<9877?[9,0]:[10,0]:i<10151?[151,0]:[152,0]:[153,0]:i<10975?[293,1]:[295,0]:[296,0]:i<13624?i<12862?i<12352?i<11843?[435,1]:i<12097?[577,0]:[578,0]:[437,9]:[719,3]:i<14481?i<13985?i<13878?[438,0]:[439,0]:i<14239?[580,0]:[581,0]:[722,1]:i<15014?[582,0]:i<15164?[724,0]:[725,0]:i<19168?i<18155?i<16631?i<16278?i<15768?i<15536?i<15282?[861,0]:[862,0]:i<15540?[1003,0]:[1004,0]:[863,9]:i<16378?[1146,0]:[1147,0]:[864,8]:i<18249?[1289,0]:i<19092?i<18752?i<18498?[1290,0]:[1291,0]:i<18841?[1432,0]:[1433,0]:[1575,0]:i<21187?i<20578?i<20070?i<19562?i<19422?[866,0]:[867,0]:[1008,1]:[1150,1]:i<20737?i<20728?[1010,0]:[1011,0]:i<20991?[1152,0]:[1153,0]:i<22691?i<22203?[1292,4]:i<22437?[1576,0]:[1577,0]:[1294,8]:i<24477?i<24459?i<24252?[1718,0]:[1719,0]:[1861,0]:i<25430?i<24985?[1720,1]:i<25176?[1862,0]:[1863,0]:i<25434?[2004,0]:[2005,0]:i<27506?i<25590?[1154,0]:i<27203?i<26441?i<26346?i<25854?i<25817?[1296,0]:[1297,0]:i<26108?[1438,0]:[1439,0]:[1440,0]:[1580,3]:i<27207?[1441,0]:i<27424?[1583,0]:[1584,0]:i<37928?i<37880?i<32696?i<31311?i<29785?i<29031?i<28523?i<28014?[1722,1]:i<28269?[1864,0]:[1865,0]:[1724,9]:i<29531?i<29277?[2006,0]:[2007,0]:[2008,0]:i<30803?i<30293?[1725,1]:[1867,1]:[2009,1]:i<31800?i<31501?i<31343?[2148,0]:[2149,0]:i<31752?[2150,0]:[2292,0]:i<32693?i<32308?[2151,1]:i<32464?[2293,0]:[2294,0]:[2436,0]:i<35207?i<34097?i<33589?i<33081?i<32919?[1727,0]:[1728,0]:[1869,1]:[2011,1]:i<34697?i<34198?i<34183?[1729,0]:[1730,0]:i<34453?[1871,0]:[1872,0]:[2013,1]:i<36389?i<36224?i<35715?[2153,1]:i<35969?[2295,0]:[2296,0]:i<36270?[2437,0]:[2438,0]:i<37409?[2155,4]:i<37626?[2439,0]:[2440,0]:i<37881?[2581,0]:[2582,0]:i<46431?i<43150?i<39325?i<38968?i<38204?i<38166?i<38086?[1873,0]:[1874,0]:[1875,0]:i<38714?[2015,1]:[2017,0]:i<38970?[1876,0]:i<39173?[2018,0]:[2019,0]:[2157,2]:i<43371?i<43291?i<43231?[2020,0]:[2021,0]:[2022,1]:[2162,6]:i<47692?i<47011?i<46726?i<46543?[2583,0]:[2584,0]:i<46978?[2585,0]:[2727,0]:i<47521?[2586,1]:i<47580?[2728,0]:[2729,0]:i<48543?i<48202?[2588,1]:i<48365?[2730,0]:[2731,0]:i<49053?[2590,1]:i<49245?[2732,0]:[2733,0]:i<71950?i<60679?i<56662?i<53453?i<49628?i<49552?i<49513?i<49476?[2024,0]:[2025,0]:[2026,0]:i<49591?[2027,0]:[2028,0]:[2166,2]:i<53602?i<53531?i<53491?[2029,0]:[2030,0]:i<53567?[2031,0]:[2032,0]:[2171,6]:i<58897?i<58003?i<57555?i<57172?[2592,1]:i<57364?[2734,0]:[2735,0]:i<57810?[2594,0]:[2736,0]:i<58513?[2595,1]:i<58706?[2737,0]:[2738,0]:i<59792?i<59407?[2597,1]:i<59599?[2739,0]:[2740,0]:i<60302?[2599,1]:i<60491?[2741,0]:[2742,0]:i<67924?i<64699?i<60874?i<60795?i<60756?i<60716?[2033,0]:[2034,0]:[2035,0]:i<60834?[2036,0]:[2037,0]:[2175,2]:i<64864?i<64778?i<64738?[2038,0]:[2039,0]:i<64817?[2040,0]:[2041,0]:[2180,6]:i<70160?i<69265?i<68818?i<68434?[2601,1]:i<68625?[2743,0]:[2744,0]:i<69073?[2603,0]:[2745,0]:i<69775?[2604,1]:i<69967?[2746,0]:[2747,0]:i<71055?i<70670?[2606,1]:i<70862?[2748,0]:[2749,0]:i<71565?[2608,1]:i<71757?[2750,0]:[2751,0]:i<83790?i<78889?i<76212?i<72387?i<72214?i<72126?i<72034?[2042,0]:[2043,0]:[2044,0]:i<72301?[2045,0]:[2046,0]:[2184,2]:i<76287?i<76277?[2047,0]:[2048,0]:i<77793?i<77283?i<76773?i<76542?[2189,0]:[2190,0]:[2331,1]:[2473,1]:i<78379?i<77891?i<77887?[2191,0]:[2192,0]:i<78145?[2333,0]:[2334,0]:[2475,1]:i<80902?i<80100?i<79708?i<79399?[2610,1]:i<79567?[2752,0]:[2753,0]:i<79963?[2612,0]:[2754,0]:i<80610?[2613,1]:i<80746?[2755,0]:[2756,0]:i<83686?i<82157?i<81914?i<81412?[2615,1]:i<81659?[2757,0]:[2758,0]:i<81958?[2899,0]:[2900,0]:i<83177?[2617,4]:i<83431?[2901,0]:[2902,0]:i<83687?[3042,0]:i<83725?[3043,0]:[3044,0]:i<89983?i<86668?i<83849?i<83801?[2053,0]:[2054,0]:i<85144?i<84634?i<84125?i<83938?[2193,0]:[2194,0]:i<84379?[2335,0]:[2336,0]:[2477,1]:i<86158?i<85648?i<85393?[2195,0]:[2196,0]:[2337,1]:[2479,1]:i<86923?i<86794?i<86730?[2055,0]:[2056,0]:i<86857?[2057,0]:[2058,0]:[2197,6]:i<92425?i<92408?i<91409?i<91003?[2619,4]:i<91248?[2903,0]:[2904,0]:i<92371?i<91919?[2621,1]:i<92170?[2763,0]:[2764,0]:[2905,0]:[3045,0]:i<93267?i<92935?[2623,1]:[2765,1]:i<93777?[2625,1]:i<93942?[2767,0]:[2768,0]:i<141049?i<117271?i<105916?i<100056?i<98127?i<94324?i<94283?i<94237?i<94174?[2059,0]:[2060,0]:[2061,0]:i<94319?[2062,0]:[2063,0]:i<96619?[2201,5]:i<97617?i<97107?i<96873?[2204,0]:[2205,0]:[2346,1]:[2488,1]:i<99327?i<98817?i<98316?i<98287?[2206,0]:[2207,0]:i<98571?[2348,0]:[2349,0]:[2490,1]:i<99546?i<99480?[2350,0]:[2351,0]:[2492,1]:i<102437?i<101340?i<100899?i<100566?[2627,1]:i<100732?[2769,0]:[2770,0]:i<101154?[2629,0]:[2771,0]:i<102325?i<101850?[2630,1]:i<102070?[2772,0]:[2773,0]:i<102331?[2914,0]:[2915,0]:i<105458?i<103928?i<103457?[2632,4]:i<103673?[2916,0]:[2917,0]:[2634,8]:i<105565?i<105463?[3058,0]:[3059,0]:i<105739?[3060,0]:[3061,0]:i<109429?i<107804?i<107037?i<106272?i<106144?i<106017?[2352,0]:[2353,0]:[2354,0]:[2494,3]:i<107294?i<107165?[2355,0]:[2356,0]:[2497,1]:i<108575?i<108065?i<107935?[2357,0]:[2358,0]:[2499,1]:i<108919?i<108577?[2218,0]:i<108710?[2359,0]:[2360,0]:[2501,1]:i<113809?i<113254?[2636,2]:i<113609?i<113510?i<113403?[3062,0]:[3063,0]:[3064,0]:i<113708?[3065,0]:[3066,0]:i<116869?[2641,6]:i<117072?i<116971?[3067,0]:[3068,0]:i<117174?[3069,0]:[3070,0]:i<128870?i<122653?i<120161?i<119028?i<118263?i<117924?i<117415?i<117330?[2219,0]:[2220,0]:i<117669?[2361,0]:[2362,0]:i<118008?[2221,0]:[2363,0]:[2503,3]:i<119651?i<119143?i<119110?[2222,0]:[2223,0]:i<119398?[2364,0]:[2365,0]:[2506,1]:i<121317?i<120807?i<120300?i<120188?[2224,0]:[2225,0]:i<120552?[2366,0]:[2367,0]:[2508,1]:i<122143?i<121633?i<121469?[2226,0]:[2227,0]:[2368,1]:[2510,1]:i<126232?i<126189?i<124757?i<124183?[2645,7]:i<124610?i<124435?[2929,0]:[2930,0]:[2931,0]:i<125777?[2648,4]:i<125960?[2932,0]:[2933,0]:[3071,0]:i<128867?i<127674?i<127252?[2650,4]:i<127489?[2934,0]:[2935,0]:i<128694?[2652,4]:i<128798?[2936,0]:[2937,0]:[3076,0]:i<135983?i<131995?i<130786?i<130021?i<129682?i<129172?i<129031?[2228,0]:[2229,0]:[2370,1]:i<129766?[2230,0]:[2372,0]:[2512,3]:i<131485?i<130977?i<130816?[2231,0]:[2232,0]:i<131230?[2373,0]:[2374,0]:[2515,1]:i<132927?i<132231?i<132044?[2091,0]:[2092,0]:i<132419?i<132285?[1951,0]:[1952,0]:i<132672?[2093,0]:[2094,0]:i<134453?i<133943?i<133433?i<133178?[2233,0]:[2234,0]:[2375,1]:[2517,1]:[2235,8]:i<139424?i<139421?i<137952?i<137513?[2654,7]:i<137728?i<137586?[2938,0]:[2939,0]:[2940,0]:i<138972?[2657,4]:i<139207?[2941,0]:[2942,0]:i<139422?[3082,0]:[3083,0]:i<140536?i<140402?i<139934?[2659,1]:i<140189?[2801,0]:[2802,0]:i<140530?[2943,0]:[2944,0]:i<140973?i<140790?[2661,0]:[2662,0]:[2803,0]:i<164054?i<152397?i<151074?i<146892?i<143067?i<142264?i<141499?i<141350?i<141199?[1953,0]:[1954,0]:[1955,0]:[2095,3]:i<142557?i<142413?[1956,0]:[1957,0]:[2098,1]:[2237,2]:i<148014?i<147549?i<147039?i<146988?[1958,0]:[1959,0]:[2100,1]:i<147559?[1960,0]:i<147807?[2102,0]:[2103,0]:[2242,6]:i<151501?i<151326?i<151246?i<151165?[2663,0]:[2664,0]:[2665,0]:i<151406?[2666,0]:[2667,0]:i<151846?i<151657?[2668,0]:[2669,0]:i<152340?i<152086?[2670,0]:[2671,0]:i<152346?[2812,0]:[2813,0]:i<158997?i<156752?i<152938?i<152860?i<152731?i<152565?[2104,0]:[2105,0]:[2106,0]:i<152927?[2107,0]:[2108,0]:i<155233?[2246,5]:i<156242?i<155732?i<155488?[2249,0]:[2250,0]:[2391,1]:[2533,1]:i<158043?i<157533?i<157024?i<156945?[2251,0]:[2252,0]:i<157279?[2393,0]:[2394,0]:[2535,1]:i<158487?i<158277?[2395,0]:[2396,0]:[2537,1]:i<161084?i<160046?i<159646?i<159507?[2672,1]:i<159566?[2814,0]:[2815,0]:i<159901?[2674,0]:[2816,0]:i<161027?i<160556?[2675,1]:i<160773?[2817,0]:[2818,0]:[2960,0]:i<164024?i<162502?i<162104?[2677,4]:i<162272?[2961,0]:[2962,0]:i<163522?[2679,4]:i<163770?[2963,0]:[2964,0]:i<164032?[3105,0]:[3106,0]:i<165947?i<165857?i<165364?i<164599?i<164456?i<164262?[2397,0]:[2398,0]:[2399,0]:[2539,3]:i<165415?[2400,0]:i<165668?[2542,0]:[2543,0]:i<165942?[2544,0]:[2545,0]:i<170752?i<169772?[2681,2]:i<170056?i<169867?i<169795?[3107,0]:[3108,0]:[3109,0]:i<170564?i<170309?[3110,0]:[3111,0]:i<170604?[3252,0]:[3253,0]:i<172866?i<172250?i<171740?i<171230?i<171007?[2686,0]:[2687,0]:[2828,1]:[2970,1]:i<172565?i<172316?[2688,0]:i<172552?[2830,0]:[2831,0]:i<172819?[2972,0]:[2973,0]:i<173804?i<173376?[3112,1]:i<173600?[3254,0]:[3255,0]:i<174049?i<174037?[3114,0]:[3115,0]:[3256,0];
			}

	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 0;
		Ld.rand = function() { return Math.random(); };
		Ld.pd(new Emitter_sparks());
	}
			this.nb = function(funcValues, je) { 				var indexInt = Math.floor(je); 				var nextInt = indexInt + 1; 				return ctx.X(funcValues[indexInt], funcValues[nextInt], je - indexInt); 			}

}
